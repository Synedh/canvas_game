import { UserDto } from './auth.model';

export interface Entity {
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