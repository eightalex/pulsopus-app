import { IAsyncStatus } from './IAsyncStatus';
import { IError } from './IError';

// eslint-disable-next-line
export interface IAsyncKey extends Symbol {
	asyncKey: true;
}

export interface IAsyncStore {
	createKey(stringKey: string): IAsyncKey;

	getAsyncStatus(asyncStatus: string): IAsyncStatus;

	getAsyncError(asyncError: string): IError;

	setLoading(key: string): void;

	setSuccess(key: string): void;

	setError(key: string, error?: IError): void;
}
