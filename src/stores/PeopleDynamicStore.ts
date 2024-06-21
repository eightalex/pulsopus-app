import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import moment from 'moment';
import { useLayoutEffect } from "react";
import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { getColorByActivity } from "@/helpers/getColorByActivity.ts";
import {
	IComputedDepartmentActivity,
	IDepartment,
	IPeopleDynamicHexbinData,
	IPeopleDynamicStore,
	IPeopleDynamicTableData,
	IRootStore,
	IUser
} from '@/interfaces';
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

	private get usersForRenderByDepartment(): Array<{
		companyActivity?: number,
		prevCompanyActivity?: number,
		subActivity?: number,
		activityDiff?: number,
		rate?: number,
		subRate?: number,
		trend?: number,
		trendCompany?: number,
		user: IUser
	}> {
		const users = this.department?.users || [];
		if(!users) return [];
		const { from, to } = this.calendarRange;
		const diff = Math.abs(moment(from).diff(to, 'day'));
		const trendFrom = moment(from)
			.startOf('day')
			.subtract(diff, 'day')
			.valueOf();
		const trendTo = from;
		const companyActivity = this.rootStore.departmentsStore.getCompanyActivity(from, to);
		const prevCompanyActivity = this.rootStore.departmentsStore.getCompanyActivity(trendFrom, trendTo);
		return users.map((user) => {
			let userCurrentPeriodActivity = 0;
			let userBeforePeriodActivity = 0;

			for (const activity of (user.activity || [])) {
				const { date, value } = activity;
				const isIncludeCurrentPeriod = DateTime.isBetweenOrEquals(date, from, to);
				const isIncludeBeforePeriod = DateTime.isBetweenOrEquals(date, trendFrom, trendTo);

				if(isIncludeCurrentPeriod) {
					userCurrentPeriodActivity += Number(value);
				}
				if(isIncludeBeforePeriod) {
					userBeforePeriodActivity += Number(value);
				}
			}

			const res = {
				companyActivity,
				prevCompanyActivity,
				activity: undefined,
				prevActivity: undefined,
				activityDiff: undefined,
				rate: undefined,
				prevRate: undefined,
				trend: undefined,
				trendCompany: undefined,
				user,
			} as {
				companyActivity: number;
				prevCompanyActivity: number;
				activity?: number;
				prevActivity?: number;
				activityDiff?: number;
				rate?: number;
				prevRate?: number;
				trend?: number;
				trendCompany?: number;
				user: IUser;
			};

			if(userCurrentPeriodActivity && companyActivity) {
				res.activity = userCurrentPeriodActivity;
				res.rate = Number((userCurrentPeriodActivity / companyActivity) * 100);

				res.prevActivity = userBeforePeriodActivity;
				res.prevRate = Number((userBeforePeriodActivity / prevCompanyActivity) * 100);

				res.trendCompany = res.rate - res.prevRate;
				res.activityDiff = res.activity - res.prevActivity;
			}

			if(userCurrentPeriodActivity && userBeforePeriodActivity) {
				const cA = Math.max(Number(res.activity), 1);
				const pA = Math.max(Number(res.prevActivity), 1);
				const diffAbsolute = cA / pA;
				res.trend = userCurrentPeriodActivity >= userBeforePeriodActivity
					? diffAbsolute * 100
					: (1 - diffAbsolute) * -100;
			}
			return res;
		});
	}

	public get hexbinUsersData(): IPeopleDynamicHexbinData {
		return this.usersForRenderByDepartment.map(({ rate, user }) => ({
			value: rate || 0,
			data: user,
		}));
	}

	public get tableUsersData(): IPeopleDynamicTableData[] {
		return this.usersForRenderByDepartment.map(({ rate = 0, trend = 0, user }) => ({
			rate,
			trend,
			fill: getColorByActivity(rate, { zero: 'unset' }),
			user,
		}));
	}

	public get departmentActivityData(): IComputedDepartmentActivity {
		const { from, to } = this.calendarRange;
		const depValue = this.department?.value || 'COMPANY';
		return this.rootStore.departmentsStore
			.getDepartmentActivityDataByValue(depValue, from, to);
	}

	public get absoluteActivityData(): IComputedDepartmentActivity {
		const { from, to } = this.calendarRange;
		return this.rootStore.departmentsStore
			.getDepartmentActivityDataByValue('COMPANY', from, to);
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
		runInAction(() => {
			this.setDepartment(this.department || this.rootStore.departmentsStore.departments[0]);
		});
	}

	public unmountStore() {
		runInAction(() => {
			this.view = EPeopleDynamicView.CHART;
			this.showAbsoluteData = false;
		});
	}
}
