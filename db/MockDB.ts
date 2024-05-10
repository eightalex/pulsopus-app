import { Auth } from './Auth';
import { Department } from './Department';
import { Employees } from './Employees';

export class MockDB {
	public auth: Auth = new Auth(this);
	public department: Department = new Department(this);
	public employees: Employees = new Employees(this);
}

export default new MockDB();
