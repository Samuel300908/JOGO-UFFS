import { GameState } from './State.js';
import { Player } from './Player.js';
import { Enemy } from './Enemy.js';

export class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 450;
        this.canvas.height = 600;

        this.state = new GameState();
        this.player = new Player(this.canvas);
        this.enemies = [];
        this.keys = {};
        this.spawnRate = 0.02;

        this.initEvents();
        this.state.updateUI();
    }

    initEvents() {
        window.addEventListener('keydown', e => this.keys[e.key] = true);
        window.addEventListener('keyup', e => this.keys[e.key] = false);
        document.getElementById('start-btn').addEventListener('click', () => this.state.set('PLAYING'));
        document.getElementById('restart-btn').addEventListener('click', () => this.reset());
    }

    reset() {
        this.player = new Player(this.canvas);
        this.enemies = [];
        this.state.score = 0;
        this.spawnRate = 0.02;
        this.state.set('PLAYING');
    }

    update() {
        if (this.state.current !== 'PLAYING') return;

        this.player.move(this.keys);

        if (Math.random() < this.spawnRate) {
            this.enemies.push(new Enemy(this.canvas.width));
        }

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].update();

            // Detecta batida (colisão)
            let p = this.player, e = this.enemies[i];
            if (p.x < e.x + e.size && p.x + p.w > e.x && p.y < e.y + e.size && p.y + p.h > e.y) {
                this.state.set('GAMEOVER');
            }

            // Se o meteoro passar, ganha ponto
            if (e.y > this.canvas.height) {
                this.enemies.splice(i, 1);
                this.state.addScore(10);
                if (this.state.score % 100 === 0) this.spawnRate += 0.005;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.state.current === 'PLAYING') {
            this.player.draw(this.ctx);
            this.enemies.forEach(enemy => enemy.draw(this.ctx));
        }
    }

    start() {
        const loop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}
