import { createBrowserHistory } from 'history';
import { action, makeObservable, observable } from 'mobx';
import { generatePath } from 'react-router-dom';
import { IRootStore } from '@/interfaces';
import { BaseStore } from '@/stores/BaseStore';

const history = createBrowserHistory({
	window,
});

interface INavigateOptions {
	params?: Record<string, unknown>;
	search?: string;
}

export class RouteStore extends BaseStore {
	public history = history;

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			history: observable,
			goBack: action.bound,
			navigate: action.bound,
		});
	}

	public goBack() {
		this.history.go(-1);
	}

	public navigate(url: string, options?: INavigateOptions) {
		const { params, search = '' } = options || {};
		const route = generatePath(url, params);
		this.history.push(`${route}${search}`);
	}
}
