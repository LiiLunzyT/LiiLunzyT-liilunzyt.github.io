class Board {
    constructor(game) {
        this.game = game;
        this.lvl = null;
        this.ROWS = 10;
        this.COLS = 15;
        this.gridSize = 30;

        this.init();
    }

    init() {
    }

    clearBoard() {

    }

    draw() {
        this.clearBoard();
        for(let row = 0; row < this.ROWS; row++) {
            for(let col = 0; col < this.COLS; col++) {
                let x = 100 + col * this.gridSize;
                let y = 100 + row * this.gridSize;

                this.game.ct.strokeStyle = 'white';
                this.game.ct.strokeRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
            }
        }
    }

    update() {

    }
}