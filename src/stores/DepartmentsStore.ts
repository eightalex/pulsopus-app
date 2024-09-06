import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import moment from "moment/moment";
import api from "@/api";
import { IAutocompleteOption } from '@/components/Autocomplete';
import { generateAutocompleteOption } from "@/helpers/generateAutocompleteOption.ts";
import { IActivity, IComputedDepartmentActivity, IDepartment, IDepartmentsStore, IRootStore } from '@/interfaces';
import { DateTime } from "@/utils";
import { BaseStore } from './BaseStore';

const sortValueIndexes = ['COMPANY'];

export class DepartmentsStore extends BaseStore implements IDepartmentsStore {
	public departmentsMap: Map<IDepartment['id'], IDepartment> = new Map();

	private asyncStatuses = {
		getDepartments: this.createKey('getDepartments'),
	};

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			departmentsMap: observable,
			//
			departments: computed,
			departmentAutocompleteOptions: computed,
			// loading
			isLoadingDepartments: computed,
			// actions
			requestDepartments: action.bound,
			getDepartments: action.bound,
			findDepartment: action.bound,
			getCompanyActivity: action.bound,
			getActivityByDepartmentValue: action.bound,
			getActivitiesByDepartmentValue: action.bound,
			getDepartmentActivityDataByValue: action.bound,
		});
	}

	public get isLoadingDepartments() {
		return this.getAsyncStatus(this.asyncStatuses.getDepartments).loading;
	}

	private setDepartment(department: IDepartment) {
		const map = this.departmentsMap || new Map<IDepartment['id'], IDepartment>();
		const prevDep = map.get(department.id) || {};
		map.set(department.id, { ...prevDep, ...department });
		runInAction(() => {
			this.departmentsMap = map;
		});
	}

	public async requestDepartments(): Promise<IDepartment[]> {
		const deps = await api.departmentsService.getAll();
		this.departmentsMap = new Map();
		runInAction(() => {
			for (const dep of deps) {
				this.setDepartment(dep);
			}
		});
		return deps;
	}

	public async getDepartments(): Promise<void> {
		const key = this.asyncStatuses.getDepartments;
		this.setLoading(key);
		try {
			await this.requestDepartments();
			runInAction(() => {
				this.setSuccess(key);
			});
		} catch (err) {
			console.error(err);
			this.setError(key);
		}
	}

	private sortComparator(prev: string, next: string): number {
		return sortValueIndexes.indexOf(next) - sortValueIndexes.indexOf(prev);
	}

	public get departments(): IDepartment[] {
		return [...this.departmentsMap.values()]
			.sort((p, n) => p.value.localeCompare(n.value))
			.sort((p, n) => this.sortComparator(p.value,  n.value));
	}

	public get departmentAutocompleteOptions(): IAutocompleteOption<IDepartment>[] {
		const activeDepartments = [...this.departments].filter((d) => d.activity.length);
		return generateAutocompleteOption(activeDepartments, {
			type: 'department',
			keys: {
				value: 'id',
				label: 'label',
			}
		})
			.sort((p, n) => this.sortComparator(p.label, n.label));
	}

	public findDepartment(searchValue: string = ''): IDepartment | null {
		return [...this.departments].find(({ label, value }) => value === searchValue || label === searchValue) || null;
	}

	public getActivitiesByDepartmentValue(value: string, from?: number, to?: number): IActivity[] {
		return this.departments
			.find(d => d.value === value)?.activity
			.reduce((acc, a) => {
				const { date } = a;
				if(!from || !to) return [...acc, a];
				const isInclude = DateTime.isBetweenOrEquals(Number(date), from, to);
				if(!isInclude) return acc;
				return [...acc, a];
			}, [] as IActivity[]) || [];
	}

	public getActivityByDepartmentValue(value: string, from?: number, to?: number): number {
		return this.getActivitiesByDepartmentValue(value, from, to)
			.reduce((sum, { value }) => {
				sum+= Number(value);
				return sum;
			}, 0) || 0;
	}

	public getCompanyActivity(from?: number, to?: number): number {
		return this.getActivityByDepartmentValue('COMPANY', from, to);
	}

	public getDepartmentActivityDataByValue(
		departmentValue?: string,
		from?: number,
		to?: number
	): IComputedDepartmentActivity {
		if(!departmentValue || !(from && to)) {
			return {
				currentDepartmentActivity: 0,
				prevDepartmentActivity: 0,
				currentCompanyActivity: 0,
				prevCompanyActivity: 0,
				rate: 0,
				trend: 0,
				activities: [],
			};
		}
		const diff = Math.abs(moment(from).diff(to, 'day'));
		const trendFrom = moment(from).startOf('day').subtract(diff, 'day').valueOf();
		const trendTo = from;
		const { getActivityByDepartmentValue, getActivitiesByDepartmentValue } = this.rootStore.departmentsStore;

		const activities = getActivitiesByDepartmentValue(departmentValue, from, to);

		const companyActivity = this.rootStore.departmentsStore.getCompanyActivity(from, to);
		const prevCompanyActivity = this.rootStore.departmentsStore.getCompanyActivity(trendFrom, trendTo);
		const currentDepartmentActivity = getActivityByDepartmentValue(departmentValue, from, to);
		const prevDepartmentActivity = getActivityByDepartmentValue(departmentValue, trendFrom, trendTo);

		const cA = Math.max(Number(currentDepartmentActivity), 1);
		const pA = Math.max(Number(prevDepartmentActivity), 1);
		const diffAbsolute = cA / pA;
		let trend = cA >= pA
			? (diffAbsolute - 1) * 100
			: (1 - diffAbsolute) * -100;
		if(!prevDepartmentActivity) trend = 100;
		if(!currentDepartmentActivity) trend = 0;
		return {
			currentDepartmentActivity: currentDepartmentActivity,
			prevDepartmentActivity: prevDepartmentActivity,
			currentCompanyActivity: companyActivity,
			prevCompanyActivity: prevCompanyActivity,
			rate: !(currentDepartmentActivity && companyActivity) ? 0 : (currentDepartmentActivity/ companyActivity) * 100,
			trend,
			activities,
		};
	}
}

