import { GameState } from './State.js';
import { Player } from './Player.js';
import { Enemy } from './Enemy.js';

export class GameEngine {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 480;
        this.canvas.height = 640;

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
        
        // Ações de fluxo de tela
        document.getElementById('start-btn').addEventListener('click', () => this.state.reset());
        document.getElementById('restart-btn').addEventListener('click', () => this.state.reset());
        
        // BOTÃO DE VOLTAR: Resolve o problema de ficar preso na tela final
        document.getElementById('back-to-menu-btn').addEventListener('click', () => {
            this.enemies = [];
            this.state.set('MENU');
        });

        // Controles da janela de instruções
        const modal = document.getElementById('instructions-modal');
        document.getElementById('how-to-btn').addEventListener('click', () => modal.classList.remove('hidden'));
        document.getElementById('close-instructions-btn').addEventListener('click', () => modal.classList.add('hidden'));
    }

    update() {
        if (this.state.current !== 'PLAYING') return;

        this.player.move(this.keys);

        if (Math.random() < this.spawnRate) {
            this.enemies.push(new Enemy(this.canvas.width));
        }

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].update();

            // Batida tira vida ao invés de matar direto instantaneamente
            let p = this.player, e = this.enemies[i];
            if (p.x < e.x + e.size && p.x + p.w > e.x && p.y < e.y + e.size && p.y + p.h > e.y) {
                this.enemies.splice(i, 1);
                this.state.damage(25); // Tira 25% de vida. Aguenta 4 batidas.
                continue;
            }

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
