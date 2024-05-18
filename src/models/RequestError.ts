import { ERequestErrorStatus, ERequestErrorType } from '@/constants/ERequestError';
import { IRequestError } from '@/interfaces';
import { AxiosError } from 'axios';

export class RequestError implements IRequestError {
	public status?: ERequestErrorStatus;
	public type?: ERequestErrorType = ERequestErrorType.REST;
	public readonly originalError: AxiosError;

	constructor(error: AxiosError) {
		this.originalError = error;
	}

	public get isNotAuthorized() {
		return false;
	}
}
