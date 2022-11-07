class Gfx {
    public x = 0;
    public y = 0;
    public path = new Path2D();
    protected red: number;
    protected green: number;
    protected blue: number;

    constructor (
        protected readonly ctx: CanvasRenderingContext2D,
        red: number,
        green: number,
        blue: number,
        random: boolean=false
    ) {
        this.red = red - Math.round(Math.random() * 20 * Number(random));
        this.green = green - Math.round(Math.random() * 20 * Number(random));
        this.blue = blue - Math.round(Math.random() * 20 * Number(random));
    }

    public draw() { }

    public isIn(posX: number, posY: number) {
        return this.ctx.isPointInPath(this.path, posX, posY);
    }
}

export default Gfx;
