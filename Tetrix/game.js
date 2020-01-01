//
class Game {
	constructor() {
		this.canvas = null;
		this.context = null;
		
		this.btn_start = null;

		this.running = null;
		this.isRunning = null;
		this.fallTime = null;
		this.score = null;
		this.log = null;
		this.init();
	}

	init() {
		// Set up board game
		this.canvas = document.getElementById('game-canvas');
		this.context = this.canvas.getContext('2d');
		this.canvas.width = WIDTH;
		this.canvas.height = HEIGHT;

		// Set score
		this.isRunning = false;
		this.score = 0;
		this.log = "";

		// Set up Button
		document.getElementById('btn_start').style.display = 'block';
		document.getElementById('btn_end').style.display = 'none';

		// Set up Key press
		this.readKeyPress();

		// Set up Board
		this.board = new Board(this);

		// Set up Brick

		//
		this.drawBoard();
	}

	readKeyPress() {
		document.addEventListener('keydown', (event) => {
			switch(event.code) {
				case K_UP: this.brick.rotate(); break;
				case K_DOWN: this.brick.fall(); break;
				case K_LEFT: this.brick.moveLeft(); break;
				case K_RIGHT: this.brick.moveRight(); break;
				case 'ShiftLeft': this.brick.instantFall(); break;
			}
		});
	}

	gameStart() {
		console.clear();
		console.log('GAME START');
		document.getElementById('btn_start').style.display = 'none';
		document.getElementById('btn_end').style.display = 'block';

		this.brick = new Brick(game);
		this.board = new Board(game);
		this.fallTime = setInterval( () => {
			this.brick.fall();
		}, 500);

		this.loop();
	}

	gameEnd() {
		console.log('GAME END');
		document.getElementById('btn_start').style.display = 'block';
		document.getElementById('btn_end').style.display = 'none';

		clearTimeout(this.running);
		clearInterval(this.fallTime);
	}

	loop() {
		this.update();
		this.draw();
		this.running = setTimeout( () => this.loop(), 30);
	}

	update() {
	}

	drawBoard() {
		// Draw board game
		this.context.fillStyle = 'white';
		this.context.fillRect(0, 0, WIDTH - SCORE_WIDTH, HEIGHT);
		this.context.fillStyle = 'gray';
		this.context.fillRect(WIDTH, 0, SCORE_WIDTH - WIDTH, HEIGHT);
		this.context.strokeRect(0, 0, WIDTH, HEIGHT);

		// Draw Score
		this.context.fillStyle = 'black';
		this.context.font = '30px Arial';
		this.context.fillText("Score : " + this.score, SCORE_WIDTH, HEIGHT/2);

		// Draw log
		this.context.fillStyle = 'black';
		this.context.font = '30px Arial';
		this.context.fillText(this.log, SCORE_WIDTH, HEIGHT/2 + SIZE);
	}

	draw() {
		this.drawBoard();
		this.board.draw();
		this.brick.draw();
	}
}

//
var game = new Game();