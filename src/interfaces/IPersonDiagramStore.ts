import { IDepartment } from "@/interfaces/IDepartment.ts";
import { IUser } from "@/interfaces/IUser.ts";

export interface IPersonDiagramStore {
    isCompare: boolean;
    personValue?: IUser;
    compareValue?: IUser | IDepartment;
}