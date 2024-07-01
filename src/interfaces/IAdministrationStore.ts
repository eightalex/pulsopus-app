import { IUser } from '@/interfaces/IUser';

export interface IAdministrationStore {
    globalFilter: string;
    //
    users: IUser[];
    //
    setGlobalFilter: (value?: string) => void;
    //
    mountStore: () => void;
    unmountStore: () => void;
}
