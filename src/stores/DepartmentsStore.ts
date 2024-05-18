import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import api from "@/api";
import { IAutocompleteOption } from '@/components/Autocomplete';
import { generateAutocompleteOption } from "@/helpers/generateAutocompleteOption.ts";
import { IDepartment, IDepartmentsStore, IRootStore } from '@/interfaces';
import { BaseStore } from './BaseStore';

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

	public get departments(): IDepartment[] {
		return [...this.departmentsMap.values()];
	}

	public get departmentAutocompleteOptions(): IAutocompleteOption[] {
		return generateAutocompleteOption([...this.departments], {
			type: 'department',
			keys: {
				value: 'id',
				label: 'name',
			}
		});
	}

	public findDepartment(searchValue: string = ''): IDepartment | null {
		return [...this.departments].find(({ label, value }) => value === searchValue || label === searchValue) || null;
	}
}

