import { IUser } from '@/interfaces/IUser';

export interface IAdministrationStore {
    globalFilter: string;
    //
    users: IUser[];
    usersToDelete: IUser[];
    //
    setGlobalFilter: (value?: string) => void;
    setUsersToDelete: (users: IUser[]) => void;
    //
    mount: () => void;
    unmount: () => void;
}
