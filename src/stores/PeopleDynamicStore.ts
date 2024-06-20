import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import moment from 'moment';
import { IHexbinWidgetProps } from "@/components/HexbinWidget";
import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { generateActivityData } from '@/helpers/generateActivityData';
import { IDepartment, IPeopleDynamicHexbinData, IPeopleDynamicStore, IRootStore, IUser } from '@/interfaces';
import { IActivity } from "@/interfaces/IActivity.ts";
import { CalendarRangeBase } from "@/stores/CalendarRangeBase.ts";
import { DateTime } from "@/utils";

export class PeopleDynamicStore extends CalendarRangeBase implements IPeopleDynamicStore {
	public view: EPeopleDynamicView = EPeopleDynamicView.CHART;
	public showAbsoluteData: boolean = false;
	public department: IDepartment | null = null;
	private prevDepartment: IDepartment | null = null;

	private asyncStatuses = {
		mounting: this.createKey('mounting'),
	};

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			view: observable,
			showAbsoluteData: observable,
			department: observable,
			//
			hexbinUsersData: computed,
			departmentActivityData: computed,
			absoluteActivityData: computed,
			// loading
			isLoading: computed,
			isLoadingMounting: computed,
			// actions
			onToggleView: action.bound,
			onToggleShowAbsoluteData: action.bound,
			setDepartment: action.bound,
			//
			mountStore: action.bound,
			unmountStore: action.bound,
		});
	}

	public get isLoadingMounting() {
		return this.getAsyncStatus(this.asyncStatuses.mounting).loading;
	}

	public get isLoading() {
		const { isLoadingUsers } = this.rootStore.usersStore;
		const { isLoadingDepartments } = this.rootStore.departmentsStore;
		return this.isLoadingMounting || isLoadingUsers || isLoadingDepartments;
	}

	// public get usersForRender(): IUser[] {
	// 	if(!this.department?.id) return this.rootStore.usersStore.users;
	// 	const { from, to } = this.calendarRange || { from: moment().startOf('day'), to: moment().endOf('day') };
	// 	const users = this.rootStore.usersStore.users || [];
	// 	const us = [...users].filter((u) => {
	// 		if(!this.department || this.department.value === 'COMPANY') return true;
	// 		return u?.department?.value === this.department.value;
	// 	});
	// 	return us.map((user) => {
	// 			const value = user.activity.reduce((acc, { date, value: strR }) => {
	// 				const d = Number(date);
	// 				const isBetweenOrEq = moment(d).isBetween(from, to, null, '[]');
	// 				if (!isBetweenOrEq) return acc;
	// 				if(!strR) return acc;
	// 				const r = Number(strR);
	// 				if(!r) return 1;
	// 				acc = (acc + r) / 2;
	// 				return acc;
	// 			}, 0);
	// 			return {
	// 				...user,
	// 				activity: [
	// 					{ date: moment(to).valueOf(), value },
	// 				]
	// 			};
	// 		});
	// }

	private get usersForRenderByDepartment(): Array<{ rate: number, trend: number, user: IUser }> {
		const users = this.department?.users || [];
		if(!users) return [];
		const { from, to } = this.calendarRange;
		const trendFrom = moment(from)
			.startOf('day')
			.subtract(1, 'year')
			.valueOf();
		const trendTo = moment(to)
			.endOf('day')
			.subtract(1, 'year')
			.valueOf();
		const companyActivity = this.rootStore.departmentsStore.getCompanyActivity(from, to);
		return users.map((user) => {
			let userCurrentPeriodActivity = 0;
			let userBeforePeriodActivity = 0;

			for (const activity of (user.activity || [])) {
				const { date, value } = activity;
				const isIncludeCurrentPeriod = DateTime.isBetweenOrEquals(date, from, to);
				const isIncludeBeforePeroid = DateTime.isBetweenOrEquals(date, trendFrom, trendTo);
				if(isIncludeCurrentPeriod) {
					userCurrentPeriodActivity += Number(value);
				}
				if(isIncludeBeforePeroid) {
					userBeforePeriodActivity += Number(value);
				}
			}

			let res = {
				rate: 0,
				trend: 0,
				user,
			};

			if(userCurrentPeriodActivity && companyActivity) {
				res = {
					...res,
					rate: Number((userCurrentPeriodActivity / companyActivity) * 100),
				};
			}

			if(userCurrentPeriodActivity && userBeforePeriodActivity) {
				res = {
					...res,
					trend: userBeforePeriodActivity - userCurrentPeriodActivity,
				};
			}
			return res;
		});
	}

	public get hexbinUsersData(): IPeopleDynamicHexbinData {
		console.log('this.usersForRenderByDepartment', this.usersForRenderByDepartment);
		return this.usersForRenderByDepartment.map(({ rate, user }) => ({
			value: rate,
			data: user,
		}));
	}

	public get absoluteDtaActivities(): IActivity[] {
		const { from, to } = this.calendarRange || { from: moment().startOf('day'), to: moment().endOf('day') };
		//TODO: refactor next find line
		const department = this.rootStore.departmentsStore.departments.find(({ name }) => name === 'COMPANY');
		const activities = department?.activity || [];
		return activities
			.reduce((acc, { date, value }) => {
				const d = Number(date);
				const isBetweenOrEq = moment(d).isBetween(from, to, null, '[]');
				if (!isBetweenOrEq) return acc;
				return [...acc, { date, value: Number(value) }];
			}, [] as IActivity[]);
	}

	public get departmentActivityData() {
		return generateActivityData({
			// activities: this.department?.activity,
			// activities: this.usersForRender.flatMap(u => u.activity),
			activities: [],
			calendarRange: this.calendarRange
		});
	}

	public get absoluteActivityData() {
		return [];
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
			const d = moment(date).format('DD.MM.YYYY');
		});
		return generateActivityData({
			activities: this.absoluteDtaActivities,
			calendarRange: this.calendarRange
		});
	}

	public onToggleView() {
		runInAction(() => {
			if(this.view === EPeopleDynamicView.CHART) {
				this.view = EPeopleDynamicView.TABLE;
				this.setDepartment(this.rootStore.departmentsStore.departments[0]);
				return;
			}
			this.view = EPeopleDynamicView.CHART;
			this.setDepartment(this.prevDepartment);
		});
	}

	public onToggleShowAbsoluteData() {
		runInAction(() => {
			this.showAbsoluteData = !this.showAbsoluteData;
		});
	}

	public setDepartment(department: IDepartment | null) {
		runInAction(() => {
			this.prevDepartment = this.department || department;
			this.department = department || this.prevDepartment || this.rootStore.departmentsStore.departments[0];
		});
	}

	public async mountStore() {
		const key = this.asyncStatuses.mounting;
		try {
			this.setLoading(key);
			await this.rootStore.usersStore.getUsers();
			await this.rootStore.departmentsStore.getDepartments();
			runInAction(() => {
				this.setDepartment(this.department || this.rootStore.departmentsStore.departments[0]);
				this.setSuccess(key);
			});
		} catch (err) {
			console.error(err);
			this.setError(key);
		}
	}

	public unmountStore() {
		runInAction(() => {
			this.view = EPeopleDynamicView.CHART;
			this.showAbsoluteData = false;
		});
	}
}
