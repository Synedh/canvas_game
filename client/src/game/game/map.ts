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
        for (const [x, row] of Object.entries(tileMap)) {
            for (const [y, cell] of row.entries()) {
                if (cell) {
                    const tile = new Tile(new Wall(ctx, 60, 60, 60, false), false);
                    this.addTile(tile, { x: parseInt(x), y, z: 1 });
                } else {
                    const tile = new Tile(new Cell(ctx, 120, 120, 120, false), true);
                    this.addTile(tile, { x: parseInt(x), y, z: 0 });
                }
            }
        }
    }

    public addTile(tile: Tile, pos: { x: number, y: number, z: number}) {
        tile.pos = pos;
        tile.map = this;
        // tile.setPos(pos.x, pos.y);
        this.tiles.push(tile);
    }

    public addEntity(entity: Entity, pos: { x: number, y: number, z: number}) {
        entity.pos = pos;
        entity.map = this;
        // entity.setPos(pos.x, pos.y);
        this.entities.push(entity);
    }

    public removeTile(tile: Tile) {
        const index = this.tiles.indexOf(tile);
        if (index < 0) {
            throw new Error("Map.removeTile : la tuile à supprimer ne fait pas partie de la carte !");
        }
        this.tiles.splice(index, 1);
    }

    public update() {
        const toUpdate = [...this.tiles, ...this.entities];
        toUpdate.sort((objA, objB) => {
            const priorityA = objA.pos.x + objA.pos.y + objA.pos.z * this.tiles.length;
            const priorityB = objB.pos.x + objB.pos.y + objB.pos.z * this.tiles.length;
            return priorityA - priorityB;
        });
        toUpdate.forEach(obj => obj.update());
    }

    public click(posX: number, posY: number): Tile | undefined {
        return this.tiles.find(tile => tile.content.isIn(posX, posY));
    }

    public moveEntity(entityId: string, path: { posX: number, posY: number}[]) {
        const entity = this.entities.find(entity => entity.id === entityId);
        if (!entity) {
            return
        }
        entity.move(path);
    }

    public getTileAt(posX: number, posY: number) {
        return this.tiles.find(tile => tile.pos.x === posX && tile.pos.y === posY);
    }
}

export default Map;
