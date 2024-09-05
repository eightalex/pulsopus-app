import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { IAutocompleteOption } from '@/components/Autocomplete';
import { IDepartment, IRootStore, IUser, IUserDiagramChartData, IUserDiagramStore } from '@/interfaces';
import { CalendarRangeBase } from "@/stores/CalendarRangeBase.ts";

export class UserDiagramStore extends CalendarRangeBase implements IUserDiagramStore {
	public targetId: IUser['id'] = '';
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
			// loading
			isLoadingMount: computed,
			isLoading: computed,
			// actions
			onToggleCompare: action.bound,
			setCompareValueByOption: action.bound,
			setUser: action.bound,
			mountStore: action.bound,
			unmountStore: action.bound,
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

	public get chartData(): IUserDiagramChartData[] {
		const generateDataForUser = (user: IUser): IUserDiagramChartData => {
			const { id, username, position, department } =  user;
			const {
				activity = [],
				rate = 0,
				trend = 0,
				currentUserActivity,
				prevUserActivity
			} = this.rootStore.usersStore.calcUserTrendRateData(id, this.rangeFrom, this.rangeTo);
			return  {
				subtitles: [department, position].filter(v => Boolean(v)) as string[],
				activity,
				rate,
				currentRateValue: currentUserActivity,
				prevRateValue: prevUserActivity,
				trend,
				title: username
			};
		};

		const generateDataForDepartment = (department: IDepartment): IUserDiagramChartData => {
			const { value, label } =  department;
			const {
				activities: activity,
				rate,
				trend,
				currentDepartmentActivity,
				prevDepartmentActivity
			} = this.rootStore.departmentsStore.getDepartmentActivityDataByValue(value, this.rangeFrom, this.rangeTo);
			console.log('rate', rate);
			console.log('trend', trend);
			console.log('currentDepartmentActivity', currentDepartmentActivity);
			console.log('prevDepartmentActivity', prevDepartmentActivity);
			return  {
				activity,
				rate,
				trend,
				currentRateValue: currentDepartmentActivity,
				prevRateValue: prevDepartmentActivity,
				title: label
			} as IUserDiagramChartData;
		};

		const renderDataList: Array<IUser | IDepartment | null> = [this.user];
		if(Boolean(this.compareValue) && this.isCompare) {
			renderDataList.push(this.compareValue);
		}

		return renderDataList
			.reduce((acc, d) => {
				if(!d) return acc;
				if('username' in d) {
					acc.push(generateDataForUser(d as IUser));
				} else {
					acc.push(generateDataForDepartment(d as IDepartment));
				}
				return acc;
			}, [] as IUserDiagramChartData[]);
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
			this.targetId = '';
			this.user = null;
			this.compareValue = null;
			this.isCompare = false;
		});
	}

	public async mountStore(userId?: IUser['id']): Promise<void> {
		if(!userId || this.isLoadingMount) return;

		const key = this.asyncStatuses.mounting;
		this.setLoading(key);
		try {
			const user = await this.rootStore.usersStore.getUser(userId);
			runInAction(() => {
				this.targetId = userId;
				if(user) this.setUser(user);
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
}
