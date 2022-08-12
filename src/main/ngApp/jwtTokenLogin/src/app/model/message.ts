import { User } from "./user";

export interface Message {
    message: string;
    status: boolean;
    user?: User;
}