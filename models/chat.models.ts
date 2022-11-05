import { UserDto } from "./auth.model";

export enum MessageType {
    System,
    ChanInfo,
    User,
    Game
}

export interface Message {
    user?: UserDto;
    type: MessageType;
    content: string;
}

export interface Chan {
    id: string;
    name: string;
    users: UserDto[];
    messages: Message[];
}
