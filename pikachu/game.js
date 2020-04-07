class Game {
    constructor() {
        this.cv = null;
        this.ct = null;
        this.board = null;
        this.screenMode = null;
        this.d_width = 600;
        this.d_height = 400;
        this.init();
    }

    init() {
        this.cv = document.createElement('canvas');
        this.cv.style.backgroundColor = 'black';
        document.body.appendChild(this.cv);
        this.ct = this.cv.getContext('2d');
        window.addEventListener('resize', () => {
            this.setScreen();
            this.draw();
        });
        this.setScreen();

        this.board = new Board(this);
        this.draw();
    }

    setScreen() {
        this.cv.width = window.innerWidth;
        this.cv.height = window.innerHeight;
        if(this.cv.width < this.cv.height) this.screenMode = 'landscape';
        else this.screenMode = 'portrait';
        
        this.ct.translate(this.ct.width * 0.5, this.ct.height * 0.5);
        this.ct.rotate(90 * Math.PI / 180);
        this.ct.translate(-this.ct.width * 0.5, -this.ct.height * 0.5);

    }

    draw() {
        this.board.draw();
    }
}

let game = new Game();