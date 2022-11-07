import Gfx from "./gfx";

class Entity extends Gfx {
    draw () {
        const topColor = `rgb(${this.red},${this.green},${this.blue})`;
        const sideColor = `rgb(${Math.round(0.8 * this.red)},${Math.round(0.8 * this.green)},${Math.round(0.8 * this.blue)})`;

        const width = 64 * 0.5;
        const height = 32;

        this.ctx.save()
        this.ctx.scale(1, 0.5);

        const sidePath = new Path2D();
        sidePath.moveTo(this.x - width, (this.y - height * 2) * 2);
        sidePath.lineTo(this.x - width, (this.y) * 2);
        sidePath.arc(this.x, (this.y) * 2, width, Math.PI, 0, true);
        sidePath.lineTo(this.x + width, (this.y - height * 2) * 2);
        sidePath.closePath();

        this.ctx.fillStyle = sideColor;
        this.ctx.fill(sidePath);
        this.path.addPath(sidePath);

        const topPath = new Path2D();
        topPath.arc(this.x, (this.y - height * 2) * 2, width, Math.PI * 2, 0);
        topPath.closePath();

        this.ctx.fillStyle = topColor;
        this.ctx.fill(topPath);
        this.path.addPath(topPath);
        this.path.closePath();

        this.ctx.restore();
    }
}

export default Entity;