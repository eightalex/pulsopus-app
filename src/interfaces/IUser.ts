import { EUserRole } from "@/constants/EUser.ts";

export interface IUser {
    id: string;
    avatar: string;
    username: string;
    roles: EUserRole[];
}