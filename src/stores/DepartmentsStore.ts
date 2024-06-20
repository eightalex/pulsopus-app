import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import api from "@/api";
import { IAutocompleteOption } from '@/components/Autocomplete';
import { generateAutocompleteOption } from "@/helpers/generateAutocompleteOption.ts";
import { IDepartment, IDepartmentsStore, IRootStore } from '@/interfaces';
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
			departments: computed,
			departmentAutocompleteOptions: computed,
			// loading
			isLoadingDepartments: computed,
			// actions
			getDepartments: action.bound,
			findDepartment: action.bound,
			getCompanyActivity: action.bound,
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

	public async getDepartments(): Promise<void> {
		const key = this.asyncStatuses.getDepartments;
		this.setLoading(key);
		try {
			const deps = await api.departmentsService.getAll();
			runInAction(() => {
				for (const dep of deps) {
					this.setDepartment(dep);
				}
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

	public get departmentAutocompleteOptions(): IAutocompleteOption[] {
		const activeDepartments = [...this.departments].filter((d) => d.activity.length);
		return generateAutocompleteOption(activeDepartments, {
			type: 'department',
			keys: {
				value: 'id',
				label: 'value',
			}
		})
			.sort((p, n) => this.sortComparator(p.label, n.label));
	}

	public findDepartment(searchValue: string = ''): IDepartment | null {
		return [...this.departments].find(({ label, value }) => value === searchValue || label === searchValue) || null;
	}

	public getCompanyActivity(from?: number, to?: number): number {
		return this.departments
			.find(({ value }) => value === 'COMPANY')?.activity
			.reduce((acc, d) => {
				const { date, value } = d;
				if(!from || !to) return acc + value;
				const isInclude = DateTime.isBetweenOrEquals(Number(date), from, to);
				if(!isInclude) return acc;
				return acc + Number(value);
			}, 0) || 0;
	}
}

