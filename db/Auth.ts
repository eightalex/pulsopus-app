import { IAuthAuthorize } from '@/interfaces';
import { MockDB } from './MockDB';
import { wait } from './wait';
import {LocalService} from "@/api/services";

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQHB1bHNvcHVzLmNvbSIsImlkIjo2LCJpYXQiOjE3MDgyODkxNjUsImV4cCI6MTcwODg5Mzk2NX0.5rB2zddEfuiEcFOtAXNmSNbWBbIB5VgaMvhLBXIxyW4';
const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQHB1bHNvcHVzLmNvbSIsImlkIjo2LCJpYXQiOjE3MDgyODkxNjUsImV4cCI6MTcwODM3NTU2NX0.mHtAjJBtxL3XSC8egDUleylPYdZ0rU68xTh-A8mGqgU';
const avatar = 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png';

const user = {
	id: 0,
	username: 'admin@pulsopus.com',
	firstName: 'admin',
	lastName: 'admin',
	avatar,
	role: 'ADMIN',
} as IAuthAuthorize['user'];

export class Auth {
	private readonly local = new LocalService();
	constructor(private readonly db: MockDB) {}

	public async isUserExistByEmail(email: string): Promise<boolean> {
		await wait(200);
		const users = this.local.getLocalUsers();
		return Boolean(users.find(([l]) => l === email));
	}

	public async current(): Promise<IAuthAuthorize> {
		await wait();
		return {
			accessToken,
			refreshToken,
			user,
		};
	}

	public async login(username: string, password: string): Promise<IAuthAuthorize> {
		await wait();
		const users = this.local.getLocalUsers();
		const findedUser = users.find(([ ligin ]) => ligin === username);
		if(!findedUser) throw new Error('User not found!')
		if(findedUser[1] !== password) throw new Error('Invalid credentials')
		return {
			accessToken,
			refreshToken,
			user: {
				...user,
				username
			}
		};
	}

	public async sendAdmin(emailAdmin: string, emailUser: string, password: string): Promise<void> {
		const isExistUser = await this.isUserExistByEmail(emailUser);

		if(isExistUser) throw new Error('User already exist!');
		const isExistAdmin = await this.isUserExistByEmail(emailAdmin);
		if(!isExistAdmin) throw new Error(`Admin with email: ${emailAdmin} not found!`);

		await wait(200);
		const users = this.local.getLocalUsers();
		console.log('[SEND ADMIN] ', 'admin: ', emailAdmin, 'user: ', emailUser, 'password: ', password);
		this.local.setLocalUsers([...users, [emailUser, password]]);
	}

	public async logout() {
		await wait();
		return;
	}

	public async refresh(): Promise<IAuthAuthorize> {
		await wait();
		return {
			accessToken,
			refreshToken,
			user,
		};
	}
}
