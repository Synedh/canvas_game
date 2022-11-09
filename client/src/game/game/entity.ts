import Gfx from './gfx/gfx';
import Tile from './tile';

export default class Entity extends Tile {
    private waitingList: { x: number, y: number }[] = [];
    private readonly speed: { x: number, y: number };
    private decal = { x: 0, y: 0 };

    constructor(
        public readonly id: string,
        content: Gfx,
        speed=2
    ) {
        super(content, false);
        this.speed = {
            x: speed,
            y: speed / 2
        };
    }

    move(path: { posX: number, posY: number }[]) {
        for (const { posX, posY } of path) {
            this.waitingList.push({ x: posX, y: posY });
        }
    }

    update() {
        // console.log(this.content.x, this.content.y);
        // console.log(`[${this.decal.x},${this.decal.y}]`);
        // if (this.decal.x !== 0 || this.decal.y !== 0)
        // {
        //     if (this.decal.x > 0) {
        //         this.decal.x -= 8;
        //         this.content.x += 8;
        //     } else if (this.decal.x < 0) {
        //         this.decal.x += 8;
        //         this.content.x -= 8;
        //     }
        //     if (this.decal.y > 0) {
        //         this.decal.y -= 4;
        //         this.content.y += 4;
        //     } else if (this.decal.y < 0) {
        //         this.decal.y += 4;
        //         this.content.y -= 4;
        //     }
        // }
        if (this.waitingList.length) {
            const pos = this.waitingList.shift()!;
            this.pos.x = pos.x;
            this.pos.y = pos.y;
            // const nextTile = this.map?.getTileAt(pos.x, pos.y);
            // this.decal = {
            //     x: nextTile!.content.x - this.content.x,
            //     y: nextTile!.content.y - this.content.y
            // }
            // console.log(this.decal);
        }
        // this.content.draw();
        super.update();
    }
}
