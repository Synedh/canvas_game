import { UserDto } from "./auth.model";

export interface Message {
    user: UserDto;
    content: string;
}

export interface Chan {
    id: string;
    name: string;
    users: UserDto[];
    messages: Message[];
}
