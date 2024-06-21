import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import moment, { DurationInputArg2 } from 'moment';
import { IAutocompleteOption } from '@/components/Autocomplete';
import { ICalendarRange } from '@/components/CalendarRangePicker';
import { IChartDataPoint } from '@/components/Chart';
import { generateActivityData } from '@/helpers/generateActivityData';
import { IDepartment, IRootStore, IUser, IUserDiagramStore } from '@/interfaces';
import { CalendarRangeBase } from "@/stores/CalendarRangeBase.ts";

export class UserDiagramStore extends CalendarRangeBase implements IUserDiagramStore {
	public targetId: IUser['id'] = undefined;
	public user: IUser | null = null;
	public isCompare: boolean = false;
	public compareValue: IUser | IDepartment | null = null;
	public compareOption: IAutocompleteOption | null = null;

	private asyncStatuses = {
		mounting: this.createKey('mounting'),
	};

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			targetId: observable,
			user: observable,
			isCompare: observable,
			compareValue: observable,
			compareOption: observable,
			//
			compareAutocompleteOptions: computed,
			chartData: computed,
			userActivityData: computed,
			compareActivityData: computed,
			// loading
			isLoadingMount: computed,
			isLoading: computed,
			// actions
			onToggleCompare: action.bound,
			setCompareValueByOption: action.bound,
			setUser: action.bound,
			mountStore: action.bound,
			unmountStore: action.bound,
			getRangeDifference: action.bound,
			setCompareValue: action.bound,
		});
	}

	public get isLoadingMount() {
		return this.getAsyncStatus(this.asyncStatuses.mounting).loading;
	}

	public get isLoading() {
		const { isLoadingUsers, isLoadingUser } = this.rootStore.usersStore;
		const { isLoadingDepartments } = this.rootStore.departmentsStore;
		return this.isLoadingMount || isLoadingUsers || isLoadingUser || isLoadingDepartments;
	}

	public get compareAutocompleteOptions(): IAutocompleteOption[] {
		const { usersStore, departmentsStore } = this.rootStore;
		const departmentOptions = departmentsStore.departmentAutocompleteOptions;
		const usersOptions = usersStore.usersAutocompleteOptions
			.filter(({ value }) => this.user?.id !== value);
		return [...departmentOptions, ...usersOptions];
	}

	public get chartData(): IChartDataPoint[][] {
		if (!this.calendarRange) return [];
		const { from, to } = this.calendarRange;
		if (!from || !to) return [];
		const dateStart = moment(from).startOf('day').valueOf();
		const dateEnd = moment(to).endOf('day').valueOf();
		const renderActivity = [this.user?.activity];
		if (this.isCompare) {
			renderActivity.push(this.compareValue?.activity);
		}

		return renderActivity
			.filter(d => !!d)
			.map((activities = []) => {
				return [...activities]
					.sort((p, n) => p.date - n.date )
					.reduce((acc, activity) => {
						if(!activity) return acc;
						const { date, value: rate } = activity;
						const d = Number(date);
						const isBetweenOrEq = moment(d).isBetween(dateStart, dateEnd, null, '[]');
						if(!isBetweenOrEq) return acc;
						if(!rate) return acc;
						return [...acc, { x: moment(d).endOf('day').valueOf(), y: Number(rate) || 0 }];
				}, [] as IChartDataPoint[]);
			});
	}

	public get userActivityData() {
		return generateActivityData({
			activities: this.user?.activity,
			calendarRange: this.calendarRange
		});
	}

	public get compareActivityData() {
		return generateActivityData({
			activities: this.compareValue?.activity,
			calendarRange: this.calendarRange
		});
	}

	/**
	 * @deprecated
	 */
	private get userChartData(): unknown[] {
		if (!this.calendarRange) return [];
		const { from, to } = this.calendarRange;
		const unitType = 'day';
		const dateStart = moment(from).startOf(unitType).format('DD.MM.YY');
		const dateEnd = moment(moment().isBefore(moment(to)) ? moment() : to).endOf(unitType).format('DD.MM.YY');
		return this.user?.activity?.reduce((acc, { date, rate }) => {
			if (!date) return acc;
			const isBetweenOrEq = moment(date).isBetween(dateStart, dateEnd, null, '[]');
			return acc;
		}, []);
	}

	public onToggleCompare() {
		runInAction(() => {
			this.isCompare = !this.isCompare;
		});
	}

	public setCompareValueByOption(option?: IAutocompleteOption) {
		const { usersStore, departmentsStore } = this.rootStore;
		runInAction(() => {
			if(!option) {
				this.compareValue = null;
				return;
			}
			const id = option?.value || '';
			const finded = option.type === 'user' ? usersStore.usersMap : departmentsStore.departmentsMap;
			this.compareValue = finded.get(id) || null;
		});
	}

	public setCalendarRange(range: ICalendarRange) {
		runInAction(() => {
			this.calendarRange = range;
		});
	}

	public setUser(user: IUser | null): void {
		runInAction(() => {
			this.user = user || null;
		});
	}
	public setCompareValue(value: IUser | IDepartment | null): void {
		runInAction(() => {
			this.compareValue = value || null;
		});
	}

	public resetStore() {
		runInAction(() => {
			this.targetId = null;
			this.user = null;
			this.compareValue = null;
			this.isCompare = false;
		});
	}

	public async mountStore(userId?: IUser['id']) {
		if(!userId || this.isLoadingMount) return;

		const key = this.asyncStatuses.mounting;
		this.setLoading(key);
		try {
			const user = await this.rootStore.usersStore.getUser(userId);
			runInAction(() => {
				this.targetId = userId;
				this.setUser(user);
				this.setSuccess(key);
			});
		} catch (err) {
			console.error(err);
			this.setError(key);
		}
	}

	public unmountStore() {
		this.resetStore();
	}

	/**
	 * @deprecated
	 */
	public getRangeDifference(): { type: DurationInputArg2, diff: number } {
		if (!this.calendarRange) return;
		const { from, to } = this.calendarRange;

		const getDiffs = (type): number => {
			// return Math.ceil(Math.abs(end.diff(start, type, true)))
			// return Math.ceil(Math.abs(moment(to).endOf(type).diff(moment(from).startOf(type), type, true)))
			return Math.abs(moment(to).endOf('day').diff(moment(from).startOf('day'), type, true));
		};

		const diffDay = getDiffs('day');
		const diffMonth = getDiffs('month');
		const diffQuarter = getDiffs('quarter');
		const diffYear = getDiffs('year');

		switch (true) {
			case diffYear >= 8:
				return {
					type: 'year',
					diff: diffYear,
				};
			case diffQuarter > 6:
				return {
					type: 'quarter',
					diff: diffQuarter,
				};
			case diffMonth > 1:
				return {
					type: 'month',
					diff: diffMonth,
				};
			default:
				return {
					type: 'days',
					diff: diffDay,
				};
		}
	}
}
