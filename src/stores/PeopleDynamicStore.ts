import { ICalendarRange } from '@/components/CalendarRangePicker';
import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { generateActivityData } from '@/helpers/generateActivityData';
import { IDepartment, IPeopleDynamicStore, IRootStore, IUser, } from '@/interfaces';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import moment from 'moment';
import { BaseStore } from './BaseStore';

export class PeopleDynamicStore extends BaseStore implements IPeopleDynamicStore {
	public view: EPeopleDynamicView = EPeopleDynamicView.CHART;
	public calendarRange: ICalendarRange;
	public showAbsoluteData: boolean = false;
	public department: IDepartment | null = null;

	private asyncStatuses = {
		mounting: this.createKey('mounting'),
	};

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			view: observable,
			calendarRange: observable,
			showAbsoluteData: observable,
			department: observable,
			//
			usersForRender: computed,
			departmentActivityData: computed,
			absoluteActivityData: computed,
			// loading
			isLoading: computed,
			// actions
			onToggleView: action.bound,
			onToggleShowAbsoluteData: action.bound,
			setCalendarRange: action.bound,
			setDepartment: action.bound,
			//
			mountStore: action.bound,
			unmountStore: action.bound,
		});
	}

	public get isLoading() {
		const { isLoadingUsers } = this.rootStore.usersStore;
		const { isLoadingDepartments } = this.rootStore.departmentsStore;
		return isLoadingUsers || isLoadingDepartments;
	}

	public get usersForRender(): IUser[] {
		const { from, to } = this.calendarRange || { from: moment().startOf('day'), to: moment().endOf('day') };
		const users = this.rootStore.usersStore.users;
		if (!users) return [];
		return this.rootStore.usersStore.getUsersByDepartmentId(this.department?.id || 0)
			.map((user) => {
				const rate = user.activity.reduce((acc, { date, rate: r }) => {
					const isBetweenOrEq = moment(date).isBetween(from, to, null, '[]');
					if (!isBetweenOrEq) return acc;
					acc = (acc + r) / 2;
					return acc;
				}, 0);
				return {
					...user,
					activity: [
						{ date: moment(to).valueOf(), rate },
					]
				};
			});
	}

	public get absoluteDtaActivities(): { date: number, rate: number }[] {
		const { from, to } = this.calendarRange || { from: moment().startOf('day'), to: moment().endOf('day') };
		return (this.rootStore.departmentsStore.departmentsMap.get(0)?.activity || [])
			.reduce((acc, { date, rate }) => {
				const isBetweenOrEq = moment(date).isBetween(from, to, null, '[]');
				if (!isBetweenOrEq) return acc;
				return [...acc, { date, rate }];
			}, [] as { date: number, rate: number }[]);
	}

	public get departmentActivityData() {
		return generateActivityData({
			// activities: this.department?.activity,
			activities: this.usersForRender.flatMap(u => u.activity),
			calendarRange: this.calendarRange
		});
	}

	public get absoluteActivityData() {
		// TODO: refactor stating/ 0 - ID for all company;
		const data = this.rootStore.departmentsStore.departmentsMap.get(0);
		if(!data?.activity) {
			throw new Error('Unexpected exception! No all company activity data!');
		}
		const { activity } = data;
		if(!this.calendarRange) {
			return [];
		}
		[...activity]
			.sort((a, b) => b.date - a.date)
			.forEach(({ date, rate }) => {
			const d = moment(date).format('DD.MM.YYYY')
		})
		return generateActivityData({
			activities: this.absoluteDtaActivities,
			calendarRange: this.calendarRange
		});
	}

	public onToggleView() {
		const setedView = this.view === EPeopleDynamicView.CHART
			? EPeopleDynamicView.TABLE
			: EPeopleDynamicView.CHART;
		runInAction(() => {
			this.view = setedView;
		});
	}

	public onToggleShowAbsoluteData() {
		runInAction(() => {
			this.showAbsoluteData = !this.showAbsoluteData;
		});
	}

	public setCalendarRange(range: ICalendarRange) {
		runInAction(() => {
			this.calendarRange = range;
		});
	}

	public setDepartment(department: IDepartment | null) {
		runInAction(() => {
			this.department = department || this.rootStore.departmentsStore.departments[0];
		});
	}

	public async mountStore() {
		runInAction(() => {
			this.department = this.department || this.rootStore.departmentsStore.departments[0];
		});
	}

	public unmountStore() {
		runInAction(() => {
			this.view = EPeopleDynamicView.CHART;
			this.showAbsoluteData = false;
		})
	}
}
