import Gfx from "./gfx/gfx";
import Map from "./map";

const TILES_WIDTH = 128;
const TILES_HEIGHT = 64;

class Tile {
    public map: Map | undefined;
    public pos: { x: number, y: number, z: number } = {
        x: 0,
        y: 0,
        z: 0
    };
    public decal = { x: 0, y: 0 };

    constructor(
        public content: Gfx,
        public walkable: boolean
    ) { }

    update () {
        this.content.x = (this.pos.y - this.pos.x) * (TILES_WIDTH / 2) + this.map!.offset.x;
        this.content.y = (this.pos.y + this.pos.x) * (TILES_HEIGHT / 2) + this.map!.offset.y;
    }

    draw () {
        this.content.draw();
    }
}

export default Tile;
