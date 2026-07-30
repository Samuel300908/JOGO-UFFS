export class GameState {
    constructor() {
        this.current = 'MENU'; // MENU, PLAYING, GAMEOVER
        this.score = 0;
        this.health = 100;
        this.isNewRecord = false;
        this.highScore = localStorage.getItem('space_deluxe_high') || 0;
    }

    set(state) {
        this.current = state;
        this.updateUI();
    }

    addScore(pts) {
        this.score += pts;
        this.updateUI();
    }

    damage(amount) {
        this.health = Math.max(0, this.health - amount);
        if (this.health <= 0) {
            // Verifica recorde antes de mandar pro Game Over
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('space_deluxe_high', this.highScore);
                this.isNewRecord = true;
            } else {
                this.isNewRecord = false;
            }
            this.set('GAMEOVER');
        }
        this.updateUI();
    }

    reset() {
        this.score = 0;
        this.health = 100;
        this.isNewRecord = false;
        this.set('PLAYING');
    }

    updateUI() {
        // Atualiza textos numéricos
        document.getElementById('score').innerText = this.score;
        document.getElementById('high-score').innerText = this.highScore;
        document.getElementById('menu-high-score').innerText = this.highScore;
        document.getElementById('final-score').innerText = this.score;

        // Atualiza a Barra de Vida Visualmente
        const hpBar = document.getElementById('health-bar');
        hpBar.style.width = `${this.health}%`;
        if (this.health < 40) hpBar.style.backgroundColor = '#ff4757';
        else if (this.health < 70) hpBar.style.backgroundColor = '#ffaa00';
        else hpBar.style.backgroundColor = '#00ffcc';

        // Mostra ou Esconde a tag de Novo Recorde
        document.getElementById('new-record-tag').classList.toggle('hidden', !this.isNewRecord);

        // Chaveador de Telas Completo
        document.getElementById('menu-screen').classList.toggle('hidden', this.current !== 'MENU');
        document.getElementById('gameplay-interface').classList.toggle('hidden', this.current !== 'PLAYING');
        document.getElementById('game-over-screen').classList.toggle('hidden', this.current !== 'GAMEOVER');
    }
}
