import Map from './map';
import { Battle } from '../../../../models/game.model';
import Entity from './entity';
import Wall from './gfx/wall';

export default class Base {
    private readonly ctx: CanvasRenderingContext2D;
    private startCount: { frames: number, date: Date };
    private frames: number;
    private map: Map;

    constructor (
        private readonly battle: Battle,
        private readonly canvas: HTMLCanvasElement,
        private readonly fpsCounter: HTMLSpanElement
    ) {
        this.ctx = canvas.getContext('2d')!;
        this.ctx.scale(1, 1);

        this.canvas.setAttribute('width', window.getComputedStyle(canvas.parentElement!).width);
        this.canvas.setAttribute('height', window.getComputedStyle(canvas.parentElement!).height);

        this.startCount = { frames: 0, date: new Date() };
        this.frames = 0;

        this.map = new Map(this.ctx, battle.map);
        this.map.offset = this.getOffset();

        for (const entity of battle.entities) {
            const newEntity = new Entity(new Wall(this.ctx, 255, 0, 0, false));
            this.map.addTile(newEntity, { x: entity.pos.x, y: entity.pos.y, z: 1 });
            this.map.entities.push(newEntity);
        }

        setInterval(this.displayFPS.bind(this), 100);
        setInterval(this.animate.bind(this), 20);
    }

    public click (posX: number, posY: number) {
        const rect = this.canvas.getBoundingClientRect();
        this.map.click(posX - rect.left, posY - rect.top);
    }

    private displayFPS () {
        const time = (new Date()).getTime() - this.startCount.date.getTime();
        const frames = this.frames - this.startCount.frames;
        this.fpsCounter.innerHTML = String(Math.round(frames * 1000 / time));
        this.startCount = { frames: this.frames, date: new Date() };
    }

    private animate () {
        this.frames += 1;
        this.clear();

        this.canvas.width = 1;
        this.canvas.height = 1;
        this.canvas.width = this.canvas.parentElement!.clientWidth;
        this.canvas.height = this.canvas.parentElement!.clientHeight;

        this.map.offset = this.getOffset();

        this.ctx.scale(1, 1);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.update();
    }

    private getOffset (): { x: number, y: number } {
        return {
            x: this.canvas.parentElement!.clientWidth / 2,
            y: this.canvas.parentElement!.clientHeight / 2.5
        };
    }

    private clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}