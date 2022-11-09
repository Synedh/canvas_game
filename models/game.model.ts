import { UserDto } from './auth.model';

export interface Entity {
    id: string;
    pos: {
        x: number,
        y: number
    };
    user: UserDto;
}

export interface Battle {
    id: string;
    map: number[][];
    entities: Entity[];
}