import Gfx from './gfx';

class Wall extends Gfx {
    draw() {
        const topColor = `rgb(${this.red},${this.green},${this.blue})`;
        const leftColor = `rgb(${Math.round(0.8 * this.red)},${Math.round(0.8 * this.green)},${Math.round(0.8 * this.blue)})`;
        const rightColor = `rgb(${Math.round(0.6 * this.red)},${Math.round(0.6 * this.green)},${Math.round(0.6 * this.blue)})`;

        // Face droite.
        const rightPath = new Path2D(`m ${this.x} ${this.y - 18} v 50 l 64 -32 v -50 l -64 32`);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke(rightPath);
        this.ctx.fillStyle = rightColor;
        this.ctx.fill(rightPath);
        this.path.addPath(rightPath);

        // Face gauche.
        const leftPath = new Path2D(`m ${this.x} ${this.y - 18} v 50 l -64 -32 v -50 l 64 32`);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke(leftPath);
        this.ctx.fillStyle = leftColor;
        this.ctx.fill(leftPath);
        this.path.addPath(leftPath);

        // Face supérieure.
        const topPath = new Path2D(`m ${this.x - 64} ${this.y - 50} l 64 -32 l 64 32 l -64 32 l -64 -32`);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke(topPath);
        this.ctx.fillStyle = topColor;
        this.ctx.fill(topPath);
        this.path.addPath(topPath);
    }
}

export default Wall;
