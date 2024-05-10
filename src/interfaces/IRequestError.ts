import { ERequestErrorStatus, ERequestErrorType } from '@/constants/ERequestError';

export interface IRequestError {
    readonly status?: ERequestErrorStatus;
    readonly type?: ERequestErrorType;

    isNotAuthorized: boolean;
}
