import Gfx from './gfx/gfx.js';
import Tile from './tile.js';

export default class Entity extends Tile {
    private waitingList: { x: number, y: number }[] = [];
    private readonly speed: { x: number, y: number };
    private decal = { x: 0, y: 0 };

    constructor(content: Gfx, speed=4) {
        super(content, false);
        this.speed = {
            x: speed,
            y: speed / 2
        };
    }

    // public move(posX, posY) {
    //     if (this.map.getTileAt(this.pos.x + posX, this.pos.y + posY)?.walkable) {
    //         this.pos.x += posX;
    //         this.pos.y += posY;
    //     }
    // }

    smoothMove(posX: number, posY: number) {
        this.waitingList.push({ x: posX, y: posY });
    }

    update() {
        if (this.decal.x || this.decal.y) {
            if (this.decal.x > 0) {
                this.decal.x -= this.speed.x;
                this.content.x += this.speed.x;
            } else if (this.decal.x < 0) {
                this.decal.x += this.speed.x;
                this.content.x -= this.speed.x;
            }

            if (this.decal.y > 0) {
                this.decal.y -= this.speed.y;
                this.content.y += this.speed.y;
            } else if (this.decal.y < 0) {
                this.decal.y += this.speed.y;
                this.content.y -= this.speed.y;
            }
        } else if (this.waitingList.length) {
            const pos = this.waitingList.shift()!;
            this.pos.x = pos.x;
            this.pos.y = pos.y;
            this.map!.updateDepth();

            const toTile = this.map!.getTileAt(this.pos.x, this.pos.y)!;
            this.decal = {
                x: toTile.content.x - this.content.x,
                y: toTile.content.y - this.content.y
            }
        }
        super.update();
    }
}
