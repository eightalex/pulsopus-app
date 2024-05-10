import { getMedianValue } from '@/helpers/getMedianValue';
import { IDepartment } from '@/interfaces';
import * as d3 from 'd3';
import { MockDB } from './MockDB';
import { wait } from './wait';

export class Department {
	public departments: IDepartment[] = [
		{ id: 0, label: 'Company', value: 'company', activity: [] },
		{ id: 1, label: 'HR', value: 'hr', activity: [] },
		{ id: 2, label: 'Administration', value: 'administration', activity: [] },
		{ id: 3, label: 'Marketing', value: 'marketing', activity: [] },
		{ id: 4, label: 'Design', value: 'design', activity: [] },
		{ id: 5, label: 'Development', value: 'development', activity: [] },
		{ id: 6, label: 'Product', value: 'product', activity: [] },
		{ id: 7, label: 'R§D', value: 'rd', activity: [] },
	];

	constructor(private readonly db: MockDB) {}

	public async all(): Promise<IDepartment[]> {
		const users = this.db.employees.users;
		await wait();
		return this.departments.map((dep) => {
			const { id } = dep;
			const map = users
				.filter(({ department }) => !id || department.id === id)
				.reduce((acc, u) => {
					u.activity.forEach(({ date, rate }) => {
						const rs = acc.get(date) || [];
						rs.push(rate);
						acc.set(date, rs);
					});
					return acc;
				}, new Map() as Map<number, number[]>);
			return {
				...dep,
				activity: [...map.entries()].map(([date, rates]) => {
					const [min, max] = d3.extent(rates, (d) => d);
					return {
						date,
						rate: getMedianValue(rates),
						min: min as number,
						max: max as number,
					};
				}).sort((p, n) => n.date - p.date)
			};
		});
	}
}


