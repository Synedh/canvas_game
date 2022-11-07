// import { Node, PathFinder } from './pathfinder.js';
import Entity from './entity';
import Cell from './gfx/cell';
import Wall from './gfx/wall';
import Tile from './tile';

class Map {
    private readonly tilesWidth = 128;
    private readonly tilesHeight = 64;
    public tiles: Tile[] = [];
    public entities: Entity[] = [];
    public offset = {
        x: 0,
        y: 0
    }

    constructor (ctx: CanvasRenderingContext2D, tileMap: number[][]) {
        console.log(typeof tileMap);
        for (const [x, row] of Object.entries(tileMap)) {
            for (const [y, cell] of row.entries()) {
                let tile;
                if (cell) {
                    tile = new Tile(new Wall(ctx, 60, 60, 60, false), false);
                } else {
                    tile = new Tile(new Cell(ctx, 120, 120, 120, false), true);
                }
                this.addTile(tile, { x: parseInt(x), y, z: 0 });
            }
        }
    }

    public addTile(tile: Tile, position: { x:number, y: number, z: number}) {
        tile.pos = position;
        tile.map = this;
        this.tiles.push(tile);
    }

    public removeTile(tile: Tile) {
        const index = this.tiles.indexOf(tile);
        if (index < 0) {
            throw new Error("Map.removeTile : la tuile à supprimer ne fait pas partie de la carte !");
        }

        this.tiles.splice(index, 1);
    }

    public update() {
        this.updateDepth();
        this.updatePos();
    }

    updateDepth() {
        this.tiles.sort((tileA, tileB) => {
            const valueTileA = 5 * (tileA.pos.x + tileA.pos.y) + tileA.pos.z;
            const valueTileB = 5 * (tileB.pos.x + tileB.pos.y) + tileB.pos.z;

            return valueTileA - valueTileB;
        });
    }

    private updatePos () {
        this.tiles.forEach(tile => {
            tile.content.x = (tile.pos.y - tile.pos.x) * (this.tilesWidth / 2) + this.offset.x;
            tile.content.y = (tile.pos.y + tile.pos.x) * (this.tilesHeight / 2) + this.offset.y;
            tile.update();
        });
    }

    public click(posX: number, posY: number) {
        const tile = this.tiles.find(tile => tile.content.isIn(posX, posY));
        if (tile) {
            this.moveEntity(this.entities[0], tile.pos.x, tile.pos.y);
        }
    }

    public moveEntity(entity: Entity, posX: number, posY: number) {
        if (!entity) {
            return
        }
        // const path = getPath()
        // while (path.length) {
        //     const toTile = path.shift();
        //     entity.smoothMove(toTile.row , toTile.col);
        // }
    }

    public getTileAt(posX: number, posY: number) {
        return this.tiles.find(tile => tile.pos.x === posX && tile.pos.y === posY);
    }
}

export default Map;
