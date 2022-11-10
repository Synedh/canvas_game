import Gfx from './gfx/gfx';
import Tile from './tile';

const TILES_WIDTH = 128;
const TILES_HEIGHT = 64;

export default class Entity extends Tile {
    private waitingList: { x: number, y: number }[] = [];

    constructor(
        public readonly id: string,
        content: Gfx
    ) {
        super(content, false);
    }

    move(path: { posX: number, posY: number }[]) {
        for (const { posX, posY } of path) {
            this.waitingList.push({ x: posX, y: posY });
        }
    }

    update() {
        if (this.decal.x === 0 && this.decal.y === 0 && this.waitingList.length) {
            const targetPos = this.waitingList.shift()!;
            this.decal = {
                x: (this.pos.x - targetPos.x) * 10,
                y: (this.pos.y - targetPos.y) * 10
            }
            this.pos.x = targetPos.x;
            this.pos.y = targetPos.y;
        }
        if (this.decal.x > 0) {
            this.decal.x -= 2;
        } else if (this.decal.x < 0) {
            this.decal.x += 2
        } else if (this.decal.y > 0) {
            this.decal.y -= 2;
        } else if (this.decal.y < 0) {
            this.decal.y += 2;
        }
        const actualPos = {
            x: this.pos.x + this.decal.x / 10,
            y: this.pos.y + this.decal.y / 10
        }
        this.content.x = (actualPos.y - actualPos.x) * (TILES_WIDTH / 2) + this.map!.offset.x;
        this.content.y = (actualPos.y + actualPos.x) * (TILES_HEIGHT / 2) + this.map!.offset.y;
    }
}
