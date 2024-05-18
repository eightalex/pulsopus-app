import { IAsyncStatus } from '@/interfaces';

export class AsyncStatus implements IAsyncStatus {
	constructor(
		public readonly loading: boolean = false,
		public readonly success: boolean = false,
		public readonly error: boolean = false,
	) {}
}
