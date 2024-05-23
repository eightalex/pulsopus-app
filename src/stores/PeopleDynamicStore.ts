import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import moment from 'moment';
import { ICalendarRange } from '@/components/CalendarRangePicker';
import { EPeopleDynamicView } from '@/constants/EPeopleDynamic';
import { generateActivityData } from '@/helpers/generateActivityData';
import { IDepartment, IPeopleDynamicStore, IRootStore, IUser } from '@/interfaces';
import { IActivity } from "@/interfaces/IActivity.ts";
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
		if(!this.department?.id) return this.rootStore.usersStore.users;
		const { from, to } = this.calendarRange || { from: moment().startOf('day'), to: moment().endOf('day') };
		const users = this.rootStore.usersStore.users || [];
		const us = [...users].filter((u) => {
			if(!this.department || this.department.name === 'COMPANY') return true;
			return u.department.value === this.department.name;
		});
		return us
			.map((user) => {
				const value = user.activity.reduce((acc, { date, value: strR }) => {
					const d = Number(date);
					const isBetweenOrEq = moment(d).isBetween(from, to, null, '[]');
					if (!isBetweenOrEq) return acc;
					if(!strR) return acc;
					const r = Number(strR);
					if(!r) return 1;
					acc = (acc + r) / 2;
					return acc;
				}, 0);
				return {
					...user,
					activity: [
						{ date: moment(to).valueOf(), value },
					]
				};
			});
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
			activities: this.usersForRender.flatMap(u => u.activity),
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
		});
	}
}
