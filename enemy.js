export class Enemy {
    constructor(canvasWidth) {
        this.size = Math.random() * 20 + 20;
        this.x = Math.random() * (canvasWidth - this.size);
        this.y = -this.size;
        this.speed = Math.random() * 3 + 3;
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = '#ff4757';
        ctx.beginPath();
        ctx.arc(this.x + this.size/2, this.y + this.size/2, this.size/2, 0, Math.PI * 2);
        ctx.fill();
    }
}
