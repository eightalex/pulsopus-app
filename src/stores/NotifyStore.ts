import { toast } from 'react-toastify';
import { INotifyStore, IRootStore, TNotifyStoreType } from '@/interfaces';
import { BaseStore } from '@/stores/BaseStore';

export class NotifyStore extends BaseStore implements INotifyStore {
	constructor(rootStore: IRootStore) {
		super(rootStore);
	}

	public error(msg: string) {
		this.toast(msg, 'error');
	}

	private toast(msg: string, type: TNotifyStoreType) {
		return toast(msg, {
			progress: undefined,
			theme: "dark",
			type,
		});
	}
}
