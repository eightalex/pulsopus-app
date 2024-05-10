import { IDepartment } from '@/interfaces/IDepartment';

export interface IUserAuth {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	avatar?: string;
	role: string;
}

export interface IUserActivity {
	date: number;
	rate: number;
}

export interface IUser extends Omit<IUserAuth, 'username' | 'role'> {
	email: string;
	department: IDepartment;
	activity: IUserActivity[];
	index: '+' | '-' | '=';
	date: number;
	role: string[];
}
