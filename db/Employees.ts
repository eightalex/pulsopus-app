import { randomInterval } from '@/helpers/randomInterval';
import { IUser, IUserActivity } from '@/interfaces';
import moment from 'moment';
import { MockDB } from './MockDB';
import { wait } from './wait';

export const firstName = [
	'Leanne',
	'Ervin',
	'Clementine',
	'Patricia',
	'Chelsey',
	'Dennis',
	'Elwyn',
	'Nicholas',
	'Glenna',
	'Davis',
	'Talana',
	'Michael',
	'Daniel',
	'Valery'
];

export const lastName = [
	'Graham',
	'Howell',
	'Bauch',
	'Lebsack',
	'Dietrich',
	'Schulist',
	'Skiles',
	'Runolfsdottir',
	'Reichert',
	'Franci',
	'Stanton',
	'Skolan',
	'Coktann',
	'Nilson',
];

export const department = [
	'MARKETING',
	'DESIGN',
	'HR',
	'DEV',
	'ADMIN'
];

export const roles = [
	'ADMIN',
	'VIEWER',
];

const DATA_LENGTH = 199;
const avatar = 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png';

const generateMockActivity = (): IUserActivity[] => {
	const rnd = (min = 30, max = 100) => randomInterval(min, max);
	const type = 'days';
	const YEARS = 2;
	const start = moment().subtract(YEARS, 'year').startOf(type);
	const end = moment().endOf(type);
	const diff = end.diff(start, type);
	const activity = [];
	for (let i = 0; i < diff; i++) {
		const t = moment(start).add(i, type).valueOf();
		activity.push({ date: t, rate: rnd() });
	}
	return activity.sort((p, n) => n.date - p.date);
};

const getRandomValue = <T>(arr: T[]): T => arr[randomInterval(0, arr.length - 1)];

export class Employees {
	public users: IUser[];

	constructor(private readonly db: MockDB) {
		this.users = this.generateUsers();
	}

	private generateUsers(): IUser[] {
		return [...Array(DATA_LENGTH).keys()]
			.reduce((acc, id) => {
				const fn = getRandomValue(firstName);
				const ln = getRandomValue(lastName);
				const email = `${ln.toLowerCase()}.${fn.toLowerCase()}.com`;
				const u = {
					id,
					firstName: fn,
					lastName: ln,
					email,
					avatar,
					department: getRandomValue(this.db.department.departments.filter(({ id }) => !!id)),
					activity: generateMockActivity(),
					role: ['ADMIN', 'VIEWER'],
				} as IUser;
				acc = [...acc, u];
				return acc;
			}, [] as IUser[]);
	}

	public async get(): Promise<IUser[]> {
		await wait();
		return this.users;
	}

	public async getById(id: IUser['id']): Promise<IUser> {
		await wait();
		const user = this.users.find((u) => u.id === id);
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}
}


