import { AuthService, DepartmentsService, UsersService } from '@/api/services';
import { IEventBus, IRequestError } from '@/interfaces';

export interface IAPIRequester {
    requestErrorBus: IEventBus<IRequestError>;
    authService: AuthService;
    usersService: UsersService;
    departmentsService: DepartmentsService;
}
