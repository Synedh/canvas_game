import Gfx from "./gfx/gfx";
import Map from "./map";

class Tile {
    public map: Map | undefined;
    public pos: { x: number, y: number, z: number } = {
        x: 0,
        y: 0,
        z: 0
    };

    constructor(
        public content: Gfx,
        public walkable: boolean
    ) { }

    update() {
        this.content?.draw();
    }
}

export default Tile;
