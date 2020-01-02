class Game {
	constructor() {
		this.cv = null;
		this.ct = null;

		this.isRunning = null;
		this.isPause = null;
		this.drawInterval = null;
		this.fallInterval = null;

		this.board = null;
		this.brick = null;
		this.score = null;
		this.line = null;
		this.speed = null;
		this.init();
	}

	init() {
		// Get canvas
		this.cv = document.getElementById('game-canvas');
		this.ct = this.cv.getContext('2d');

		// set size game-canvas
		this.cv.width = WIDTH;
		this.cv.height = HEIGHT;
		this.drawBoard();
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
				case K_UP: this.brick[0].rotate(); break;
				case K_DOWN: this.brick[0].fall(); break;
				case K_LEFT: this.brick[0].moveLeft(); break;
				case K_RIGHT: this.brick[0].moveRight(); break;
				case K_SHIFTLEFT: this.brick[0].instantFall(); break;
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
			this.brick = [new Brick(this), new Brick(this)];
			this.score = 0;
			this.line = 0;
			this.speed = 0;

			this.drawInterval = setInterval( () => {
				this.update();
				this.draw();
			}, 30);
			this.fallInterval = setInterval( () => {
				this.brick[0].fall();
			}, 1000 - this.speed * 100);
		}
	}

	End() {
		if( this.isRunning) {
			this.board = null;
			clearInterval(this.fallInterval);
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
			clearInterval(this.fallInterval);
			this.brick[0].Pause();
			this.isPause = true;
 			
			this.ct.font = '30px press_start_2pregular';
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
		this.drawInterval = setInterval( () => {
			this.brick[0].fall();
		}, 1000 - (this.speed - 1) * 100);
		this.brick[0].unPause();
	}

	drawText(text, size, x, y, color = 'white', stroke = false, lWidth = 1) {
		this.ct.font = size + "px Lobster";
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
		this.ct.font = '25px P2P';
		this.ct.lineWidth = 10;
		this.ct.strokeStyle = 'black';
		this.ct.strokeText('PRESS SPACE TO START', 10, 300);
		this.ct.fillStyle = 'white';
		this.ct.fillText('PRESS SPACE TO START', 10, 300);
		this.ct.lineWidth = 1;
	}

	clearBoard () {
		// clear board
		this.ct.clearRect(0, 0, WIDTH/2, HEIGHT);
		this.ct.clearRect(365, 65, 170, 170);
	}
		// draw Main Board
	
	drawBoard() {
		// draw Stat board
		this.ct.fillStyle = 'black';
		this.ct.fillRect(300,0,WIDTH/2, HEIGHT);
		this.ct.clearRect(360, 60, 6 * SIZE, 6 * SIZE);
		this.ct.lineWidth = 8;
		this.ct.strokeStyle = 'white';
		this.ct.beginPath();
		this.ct.moveTo(302,0);
		this.ct.lineTo(302,600);
		this.ct.stroke();

		// Draw Next Brick UI
		this.drawText('NEXT',30, 360, 40);
		this.ct.strokeStyle = 'white';
		this.ct.strokeRect(360, 60, 6 * SIZE, 6 * SIZE);
		this.ct.lineWidth = 1;
		this.ct.clearRect(0, 0, WIDTH/2, HEIGHT);
	}

	update() {
		this.speed = Math.floor(this.line / 10);
	}

	draw() {
		this.clearBoard();
		this.board.draw();
		this.brick[0].draw();
		this.brick[1].draw(10,6);
	}
}

var game = new Game();