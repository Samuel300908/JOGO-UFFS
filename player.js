export class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.w = 40;
        this.h = 40;
        this.x = canvas.width / 2 - this.w / 2;
        this.y = canvas.height - 80;
        this.speed = 8;
    }

    move(keys) {
        if (keys['ArrowLeft'] && this.x > 0) this.x -= this.speed;
        if (keys['ArrowRight'] && this.x < this.canvas.width - this.w) this.x += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = '#00ffcc';
        ctx.beginPath();
        ctx.moveTo(this.x + this.w / 2, this.y);
        ctx.lineTo(this.x, this.y + this.h);
        ctx.lineTo(this.x + this.w, this.y + this.h);
        ctx.closePath();
        ctx.fill();
    }
}
