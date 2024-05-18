import { action, makeObservable,observable } from 'mobx';
import { IS_DEV } from '@/config/config.ts';
import { IAsyncKey, IAsyncStatus, IAsyncStore, IError } from '@/interfaces';
import { AsyncStatus } from '@/models/AsyncStatus';

export class AsyncStore implements IAsyncStore {
	public _asyncStatusMap: Map<string | IAsyncKey, IAsyncStatus> = new Map();
	public _asyncErrorsMap: Map<string | IAsyncKey, IError> = new Map();

	constructor() {
		makeObservable(this, {
			_asyncStatusMap: observable,
			_asyncErrorsMap: observable,

			setLoading: action.bound,
			setSuccess: action.bound,
			setError: action.bound,
			createKey: action.bound,
			resetAsyncStatus: action.bound,
		});
	}

	private hasKey(key: string | IAsyncKey): boolean {
		const hasAsyncKey = this._asyncStatusMap.has(key);

		if (!hasAsyncKey && IS_DEV) {
			console.error(`Async status with key: ${key} is not exist`);
		}

		return hasAsyncKey;
	}

	public createKey(stringKey: string): IAsyncKey {
		const key = Symbol(stringKey) as unknown as IAsyncKey;
		this._asyncStatusMap.set(key, new AsyncStatus(false, false, false));

		return key;
	}

	public getAsyncStatus(key: string | IAsyncKey): IAsyncStatus {
		this.hasKey(key);

		return this._asyncStatusMap.get(key) || new AsyncStatus(false, false, false);
	}

	public getAsyncError(key: string): IError {
		this.hasKey(key);

		return this._asyncErrorsMap.get(key) || null;
	}

	public resetAsyncStatus(key: string | IAsyncKey): void {
		this.hasKey(key);

		this._asyncStatusMap.set(key, new AsyncStatus(false, false, false));
	}

	public setLoading(key: string | IAsyncKey): void {
		this.hasKey(key);

		this._asyncErrorsMap.delete(key);
		this._asyncStatusMap.set(key, new AsyncStatus(true, false, false));
	}

	public setSuccess(key: string | IAsyncKey): void {
		this.hasKey(key);

		this._asyncErrorsMap.delete(key);
		this._asyncStatusMap.set(key, new AsyncStatus(false, true, false));
	}

	public setError(key: string | IAsyncKey, error?: IError): void {
		this.hasKey(key);

		if (error) {
			this._asyncErrorsMap.set(key, error);
		} else {
			this._asyncErrorsMap.delete(key);
		}

		this._asyncStatusMap.set(key, new AsyncStatus(false, false, true));
	}
}
