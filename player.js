export class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.w = 36;
        this.h = 36;
        this.x = canvas.width / 2 - this.w / 2;
        this.y = canvas.height - 100;
        this.speed = 7;
    }

    move(keys) {
        if (keys['ArrowLeft'] && this.x > 0) this.x -= this.speed;
        if (keys['ArrowRight'] && this.x < this.canvas.width - this.w) this.x += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = '#00ffcc';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ffcc';
        ctx.beginPath();
        ctx.moveTo(this.x + this.w / 2, this.y);
        ctx.lineTo(this.x, this.y + this.h);
        ctx.lineTo(this.x + this.w, this.y + this.h);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0; // Desativa o brilho para não dar lag nos outros objetos
    }
}
