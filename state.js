export class GameState {
    constructor() {
        this.current = 'MENU'; 
        this.score = 0;
        this.highScore = localStorage.getItem('game_high') || 0;
    }

    set(state) {
        this.current = state;
        this.updateUI();
    }

    addScore(pts) {
        this.score += pts;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('game_high', this.highScore);
        }
        this.updateUI();
    }

    updateUI() {
        document.getElementById('score').innerText = this.score;
        document.getElementById('high-score').innerText = this.highScore;
        document.getElementById('menu-screen').classList.toggle('hidden', this.current !== 'MENU');
        document.getElementById('game-over-screen').classList.toggle('hidden', this.current !== 'GAMEOVER');
    }
}
