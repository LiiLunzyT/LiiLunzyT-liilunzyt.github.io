class Game {
	constructor() {
		this.cv = null;
		this.ct = null;

		this.isRunning = null;
		this.isPause = null;
		this.drawInterval = null;
		this.brick = null;

		this.board = null;
		this.brick = null;

		this.init();
	}

	init() {
		// Get canvas
		this.cv = document.getElementById('game-canvas');
		this.ct = this.cv.getContext('2d');

		// set size game-canvas
		this.cv.width = 300;
		this.cv.height = 600;
		this.drawIntro();

		// Set variables
		this.isRunning = false;
		this.isPause = false;

		// add Key listener
		this.readKeyPress();
	}

	readKeyPress() {
		document.addEventListener('keydown', (event) => {
			switch(event.code) {
				case K_SPACE: if(!this.isRunning) {
					this.isRunning = true;
					this.Start();
				} break;

				case K_UP: this.brick.rotate();break;
				case K_DOWN: this.brick.instantFall(); break;
				case K_LEFT: this.brick.moveLeft(); break;
				case K_RIGHT: this.brick.moveRight(); break;
				case K_P: this.Pause(); break;
				case K_R: this.Start(); break;
			}
		});
	}

	Start() {
		console.log('GAME START');
		this.board = new Board(this);
		this.brick = new Brick(this);
		this.drawInterval = setInterval( () => {
			this.draw();
		}, 30);
	}

	Restart() {
		this.brick = new Brick();
		this.board = new Board();
	}

	Pause() {
		if( !this.isPause ) {
			console.log('GAME PAUSE');
			clearInterval(this.drawInterval);
			this.brick.Pause();
			this.isPause = true;
 			
			this.ct.font = '30px Sans-serif';
			this.ct.lineWidth = 8;
			this.ct.strokeStyle = 'black';
			this.ct.strokeText('GAME PAUSE', 50, 300);
			this.ct.fillStyle = 'white';
			this.ct.fillText('GAME PAUSE', 50, 300);
			this.ct.lineWidth = 1;
		}
		else {
			console.log('GAME RESUME');
			this.unPause();
			this.isPause = false;
		}
	}

	unPause() {
		this.drawInterval = setInterval( () => {
			this.draw();
		}, 50);
		this.brick.unPause();
	}

	drawIntro() {
		this.ct.font = '20px Sans-serif';
		this.ct.lineWidth = 8;
		this.ct.strokeStyle = 'black';
		this.ct.strokeText('PRESS SPACE TO START', 30, 300);
		this.ct.fillStyle = 'white';
		this.ct.fillText('PRESS SPACE TO START', 30, 300);
		this.ct.lineWidth = 1;
	}

	/*drawCaro() {
		let caro = document.getElementById('game-caro');
		caro.width = WIDTH;
		caro.height = HEIGHT;
		caro.style.left = this.cv.getBoundingClientRect().X;
		caro.style.top = this.cv.getBoundingClientRect().Y;
		let ctx = caro.getContext('2d');

		ctx.strokeStyle = 'rgba(128, 128, 128, 1)';
		for(let row = 0; row < ROWS; row++) {
			for(let col = 0; col < COLS; col++) {
				let x = col * SIZE;
				let y = (row - 4) * SIZE;
				ctx	.strokeRect(x, y, SIZE, SIZE);
			}
		}
	} */
	
	drawBoard () {
		// fill board color
		this.ct.clearRect(0, 0, WIDTH, HEIGHT);

		this.ct.strokeStyle = 'rgba(128, 128, 128, 1)';
		for(let row = 0; row < ROWS; row++) {
			for(let col = 0; col < COLS; col++) {
				let x = col * SIZE;
				let y = (row - 4) * SIZE;
				this.ct.strokeRect(x, y, SIZE, SIZE);
			}
		}	
	}

	draw() {
		this.drawBoard();
		this.board.draw();
		this.brick.draw();
	}
}

var game = new Game();