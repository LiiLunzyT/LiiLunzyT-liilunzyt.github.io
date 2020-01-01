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
		this.score = null;
		this.line = null;

		this.init();
	}

	init() {
		// Get canvas
		this.cv = document.getElementById('game-canvas');
		this.ct = this.cv.getContext('2d');

		// set size game-canvas
		this.cv.width = WIDTH;
		this.cv.height = HEIGHT;
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
				case K_SPACE: this.Start(); break;
				case K_UP: this.brick.rotate(); break;
				case K_DOWN: this.brick.fall(); break;
				case K_LEFT: this.brick.moveLeft(); break;
				case K_RIGHT: this.brick.moveRight(); break;
				case K_SHIFTLEFT: this.brick.instantFall(); break;
				case K_P: this.Pause(); break;
				case K_E: this.End(); break;
			}
		});
	}

	Start() {
		if(!this.isRunning) {
			this.isRunning = true;
			console.log('GAME START');
			this.board = new Board(this);
			this.brick = new Brick(this);
			this.score = 0;
			this.line = 0;
			this.drawInterval = setInterval( () => {
				this.draw();
			}, 30);
		}
	}

	End() {
		if( this.isRunning) {
			this.board = null;
			clearInterval(this.brick.fallInterval);
			this.brick = null;
			clearInterval(this.drawInterval);
			this.isRunning = false;

			// Draw Score Board
			this.ct.lineWidth = 8;
			this.ct.strokeStyle = 'green';
			this.ct.strokeRect(50,150, 200, 300);
			this.ct.fillStyle = 'white';
			this.ct.fillRect(50, 150, 200, 300);

			// Draw Pannel
			this.drawText('GAME END', 30, 70, 180, 'white', true, 10);


			// Draw Score
			this.drawText('Your score: ', 20, 60, 220, 'red');
			this.drawText(this.score, 30, 140, 260, 'red', true, 2);
			this.drawText('Your line cleared: ', 20, 60, 300, 'red');
			this.drawText(this.line, 30, 140, 340, 'red', true, 2);

			this.drawText('Press SPACE for', 20, 70, 400, 'red',);
			this.drawText('NEW GAME', 20, 90, 430, 'red',);
		}
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
		}, 30);
		this.brick.unPause();
	}

	drawText(text, size, x, y, color = 'white', stroke = false, lWidth = 1) {
		this.ct.font = size + "px Sans-serif";
		if(stroke) {
			this.ct.lineWidth = lWidth;
			this.ct.strokeStyle = 'black';
			this.ct.strokeText(text, x, y);
			this.ct.lineWidth = 1;
		}
		this.ct.fillStyle = color;
		this.ct.fillText(text, x, y);
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