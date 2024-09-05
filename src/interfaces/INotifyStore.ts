export type TNotifyStoreType = 'info' | 'success' | 'error';

export interface INotifyStore {
	info: (msg: string) => void;
	error: (msg: string) => void;
	success: (msg: string) => void;
}