export type TNotifyStoreType = 'success' | 'error' | 'warning';

export interface INotifyStore {
	error: (msg: string) => void;
}
