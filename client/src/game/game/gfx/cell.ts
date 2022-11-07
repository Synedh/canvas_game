import Gfx from "./gfx";

class Cell extends Gfx {
    draw() {
        this.path = new Path2D(`m ${this.x - 64} ${this.y} l 64 -32 l 64 32 l -64 32 l -64 -32`);
        this.ctx.fillStyle = `rgb(${this.red},${this.green},${this.blue})`;
        this.ctx.fill(this.path);
    }
}

export default Cell;
