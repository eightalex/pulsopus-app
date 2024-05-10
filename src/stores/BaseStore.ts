import { makeObservable, observable } from 'mobx';
import { IRootStore } from '@/interfaces';
import { AsyncStore } from './AsyncStore';

export class BaseStore extends AsyncStore {
	public rootStore: IRootStore;

	constructor(rootStore: IRootStore) {
		super();
		this.rootStore = rootStore;
		makeObservable(this, {
			rootStore: observable,
		});
	}
}
