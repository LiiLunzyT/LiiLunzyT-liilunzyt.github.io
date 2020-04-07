class Game {
	#clock;
	#score;
	#line;

	constructor() {
		this.cv = null;
		this.ct = null;
		this.font = null;
		this.bg = null;

		this.isRunning = null;
		this.isPause = null;
		this.drawInterval = null;
		this.fallInterval = null;
		this.clockInterval = null;

		this.board = null;
		this.brick = null;
		this.#score = null;
		this.#line = null;
		this.#clock = null;
		this.playerName = null;
		this.history = null;
		this.highscore = null;
		this.init();
	}

	init() {
		// Get canvas
		this.cv = document.getElementById('game-canvas');
		this.ct = this.cv.getContext('2d');
		this.ct.translate(0.5, 0.5);
		this.loadFont();
		this.setContext();
		this.bg = new Image();
		this.bg.src = './img/bg-1.jpg';

		// set size game-canvas
		this.cv.style.width = "600px";
		this.cv.style.height = "600px";
		this.cv.width = WIDTH;
		this.cv.height = HEIGHT;

		// Get player name
		let dfl_name = "noname";
		let data = [];
		if (checkLocalStorage('highscore') ) {
			data = loadLocalStorage('highscore');
			dfl_name = data[0]['name'];
		}
		this.playerName = window.prompt("Nhập tên người chơi (tối đa 10 ký tự)",dfl_name);

		// Set variables
		this.isRunning = false;
		this.isPause = false;

		this.#clock = 0;
		this.#score = 0;
		this.#line = 0;
		this.history = [];
		this.highscore = [];

		// Load Highscore
		this.loadHistory();
		this.loadHighscore();
		// Intro
		setTimeout( () => {
			this.drawBoard();
			this.drawIntro();
		}, 30);

		// add Key listener
		this.readKeyPress();
	}

	resizeScreen() {
		let k = 1;
		let screenW = screen.width;
		let screenH = screen.height;
		if(screenH < screenW) {
			this.cv.height = screenH;
			this.ct.width = screenH;
			k = screenH / HEIGHT;
		} else {
			this.cv.height = screenW;
			this.ct.width = screenW;
			k = screenW / WIDTH;
		}
		this.ct.scale(k, k);
	}

	setContext() {
		this.ct.lineWidth = 1;
		this.ct.strokeStyle = 'black';
		this.ct.fillStyle = 'black';
		this.ct.save();
	};

	loadFont() {
		let FONT = new FontFace('game-font', 'url(./css/pressstart2p.woff2)');
		FONT.load().then((font) => {
			document.fonts.add(font);
			console.log('Font loaded');
		});	
		this.font = 'game-font';
		/*
		let FONT = new FontFace('press_start_2pregular', 'url(./css/pressstart2p.woff2)');
		FONT.load().then((font) => {
			document.fonts.add(font);
			console.log('Font loaded');
		});	
		this.font = "press_start_2pregular";
		*/
	}

	loadHistory() {
		if (checkLocalStorage('highscore') ) {
			this.history = loadLocalStorage('highscore');
			this.loadHistory2Table();
		}
	}

	loadHistory2Table() {
		let table = document.createElement('table');
		let header = Object.keys(this.history[0]);
		let thead = document.createElement('thead');
		let tr = document.createElement('tr');
		let index = document.createElement('th');
		index.append("#");
		tr.appendChild(index);
		header.map( (key) => {
			let th = document.createElement('th');
			th.append(key.toUpperCase());
			tr.appendChild(th); 
		});
		thead.appendChild(tr);
		table.appendChild(thead);

		let tbody = document.createElement('tbody');
		this.history.forEach( (record, i) => {
			let tr = document.createElement('tr');
			header.map( (key, j) => {
				let td = document.createElement('td');
				if( j == 0) {
					let index = document.createElement('td');
					index.append("#" + (i+1));
					tr.appendChild(index);
				}
				td.append(record[key]);
				tr.appendChild(td);
			});
			tbody.appendChild(tr);
		});

		table.appendChild(tbody);
		document.getElementById('game-history').innerHTML = "";
		document.getElementById('game-history').appendChild(table);
	}

	loadHighscore() {
		if(checkLocalStorage('highscore')) {
			this.highscore = loadLocalStorage('highscore');
			this.highscore.sort(rankingSorter("score", "clock"));
			if( this.highscore.length > 10) this.highscore.length = 10;
			this.highscore.forEach( (record, i) => {
				if( record['score'] == "0") this.highscore.splice(i,this.highscore.length - i);
			});
			if( this.highscore.length != 0) this.loadHighscore2Table();
		}
	}

	loadHighscore2Table() {
		let table = document.createElement('table');
		let header = Object.keys(this.highscore[0]);
		let thead = document.createElement('thead');
		let tr = document.createElement('tr');
		let index = document.createElement('th');
		index.append("RANK");
		tr.appendChild(index);
		header.map( (key) => {
			let th = document.createElement('th');
			th.append(key.toUpperCase());
			tr.appendChild(th); 
		});
		thead.appendChild(tr);
		table.appendChild(thead);

		let tbody = document.createElement('tbody');
		this.highscore.forEach( (record, i) => {
			let tr = document.createElement('tr');
			header.map( (key, j) => {
				let td = document.createElement('td');
				if( j == 0) {
					let index = document.createElement('td');
					index.append("#" + (i+1));
					tr.appendChild(index);
				}
				td.append(record[key]);
				tr.appendChild(td);
			});
			tbody.appendChild(tr);
		});

		table.appendChild(tbody);
		document.getElementById('game-highscore').innerHTML = "";
		document.getElementById('game-highscore').appendChild(table);
	}

	readKeyPress() {
		document.addEventListener('keydown', (event) => {
			this.gameControl(event.code);
		});
	}

	gameControl(code) {
		if( !this.isRunning ) { // while game isn't running
				switch(code) {
					case K_ENTER: this.Start(); break;
				}
			} else {
				switch(code) { // while game is running
					case K_UP: case K_K: 
						this.brick[0].rotate(); break;
					case K_DOWN: case K_S: 
						this.brick[0].fall(); break;
					case K_LEFT: case K_A: 
						this.brick[0].moveLeft(); break;
					case K_RIGHT: case K_D: 
						this.brick[0].moveRight(); break;
					case K_SPACE: case K_L: 
						this.brick[0].instantFall();
						sound[5].play(); break;
					case K_P: this.Pause(); break;
					case K_E: this.End(); break;
				}
			}
	}

	Start() {
		this.isRunning = true;
		console.log('GAME START');
		this.board = new Board(this);
		this.brick = [new Brick(this), new Brick(this)];
		this.#score = 0;
		this.#line = 0;
		this.#clock = 0;
		this.loadHistory();
		this.loadHighscore();

		// If gameover sound is playing, stop it
		sound[4].pause();
		sound[4].currentTime = 0;

		this.clockInterval = setInterval( () => {
			this.#clock += 1; // Thời gian trò chơi thêm 1s
		}, 1000);
		this.drawInterval = setInterval( () => {
			this.update(); // Gọi hàm cập nhật
			this.draw(); // Gọi hàm vẽ các đối tượng
		}, 1000 / 60);
		this.fallInterval = setInterval( () => {
			this.brick[0].fall(); // Khối gạch hiện tại rơi 1 ô
		}, 700);
	}
	
	End() {
		this.isRunning = false;
		// if the game is pausing, unpause it before
		if( this.isPause ) {
			this.unPause();
			this.draw();
		}

		// play sound
		sound[4].play();

		// erase atrribute
		clearInterval(this.fallInterval);
		clearInterval(this.drawInterval);
		clearInterval(this.clockInterval);
		this.board = null;
		this.brick = null;
		
		// Draw Scoreboard
		this.ct.restore();
		this.ct.globalAlpha = 0.5;
		this.ct.fillStyle = 'black';
		this.ct.fillRect(0, 0, 600, 600);
		this.ct.fillStyle = 'brown';
		this.ct.fillRect(0, 210, 300, 180);
		this.ct.globalAlpha = 1.0;
		this.ct.beginPath();
		this.ct.moveTo(0,210);
		this.ct.lineTo(300,210);
		this.ct.moveTo(0, 390);
		this.ct.lineTo(300,390);
		this.ct.lineWidth = 10;
		this.ct.strokeStyle = 'red';
		this.ct.stroke();
		this.drawText('GAME OVER', 30, 20, 180, 'red', true, 8, 'black');

		// Draw Score
		this.ct.restore();
		this.drawText('SCORE: ', 20, 30, 250, 'white');
		this.drawText(this.#score, 20, 160, 250, 'white', true, 5);
		this.drawText('LINE : ', 20, 30, 310, 'white');
		this.drawText(this.#line, 20, 160, 310, 'white', true, 5);
		this.drawText('CLOCK: ', 20, 30, 370, 'white');
		this.drawText(toHHMMSS(this.#clock), 20, 160, 370, 'white', true, 5);
		this.drawText("'Enter' for", 15, 60, 420, 'white',);
		this.drawText('NEW GAME', 20, 70, 450, 'white', true, 5);

		// get Day Time
		if(this.#score != 0) {
			let today = new Date();
			let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			let dateTime = date+'\n'+time;

			// Save Score
			let data = {
				"time"  : dateTime,
				"name" : this.playerName,
				"score" : this.#score,
				"clock" : toHHMMSS(this.#clock)
			}

			this.history.unshift(data);
			setLocalStorage('highscore', this.history);
		}
	}

	Pause() {
		if( !this.isPause ) {
			console.log('GAME PAUSE');
			clearInterval(this.drawInterval);
			clearInterval(this.fallInterval);
			clearInterval(this.clockInterval);
			this.brick[0].Pause();
			this.isPause = true;
			 
			this.ct.restore();
			this.fadeScreen();
			this.drawText('GAME PAUSE', 25, 30, 300, 'white', true, 8);
		}
		else {
			console.log('GAME RESUME');
			this.unPause();
			this.isPause = false;
		}
		this.ct.restore();
	}

	unPause() {
		this.clockInterval = setInterval( () => {
			this.#clock += 1;
		}, 1000);
		this.drawInterval = setInterval( () => {
			this.update();
			this.draw();
		}, 1000/60);
		this.fallInterval = setInterval( () => {
			this.brick[0].fall();
		}, 700);
		this.brick[0].unPause();
	}

	drawText(text, size, x, y, color = 'white', stroke = false, lWidth = 1, s_color = 'black') {
		this.ct.font = size + "px " + this.font;
		if(stroke) {
			this.ct.lineWidth = lWidth;
			this.ct.strokeStyle = s_color;
			this.ct.strokeText(text, x, y);
			this.ct.lineWidth = 1;
		}
		this.ct.fillStyle = color;
		this.ct.fillText(text, x, y);
		this.ct.restore()
	}

	drawIntro() {
		this.ct.restore();
		this.ct.globalAlpha = 0.5;
		this.ct.fillStyle = 'black';
		this.ct.fillRect(0, 0, 600, 600);
		this.ct.globalAlpha = 1.0;
		this.drawText("'Enter' to start", 12, 50, 260, 'white', true, 8);
		this.drawText('NEW GAME', 25, 50, 300, 'white', true, 8);
	}

	drawCaro(x1,y1,x2,y2) {
		this.ct.restore();
		this.ct.strokeStyle = 'rgba(128, 128, 128, 1)';
		for(let row = y1; row < y2+y1; row++) {
			for(let col = x1; col < x2+x1; col++) {
				let x = col * SIZE;
				let y = (row - 4) * SIZE;
				this.ct.strokeRect(x, y, SIZE, SIZE);
			}
		}
	}

	fadeScreen() {
		this.ct.globalAlpha = 0.5;
		this.ct.fillStyle = 'black';
		this.ct.fillRect(0, 0, 600, 600);
		this.ct.globalAlpha = 1.0;
	}

	clearBoard () {
		// clear board
		this.ct.restore();
		this.ct.clearRect(0, 0, WIDTH, HEIGHT);
		this.ct.fillStyle = 'rgba(0, 0, 0)';
		this.ct.fillRect(0, 0, WIDTH, HEIGHT);
		this.ct.drawImage(this.bg, 300, 0);
		this.ct.fillStyle = 'black';
		this.ct.fillRect(360, 60, 180, 180);
	}
		// draw Main Board
	
	drawBoard() {
		this.clearBoard();
		this.ct.restore();

		// draw Stat board
		this.ct.lineWidth = 5;
		this.ct.strokeStyle = 'white';
		this.ct.beginPath();
		this.ct.moveTo(302,0);
		this.ct.lineTo(302,600);
		this.ct.stroke();

		// Draw Stat
		this.ct.beginPath();
		this.ct.lineCap = "round";
		this.ct.moveTo(370,270);
		this.ct.lineTo(570,270);
		this.ct.lineTo(570,440);
		this.ct.lineTo(540,470);
		this.ct.lineTo(340,470);
		this.ct.lineTo(340,300);
		this.ct.lineTo(370,270);
		this.ct.shadowBlur = 5;
		this.ct.shadowColor = "white";
		this.ct.lineWidth = 6;
		this.ct.strokeStyle = 'white';
		this.ct.stroke();
		this.ct.shadowBlur = 0;
		this.drawText('CLOCK: ', 20, 380, 320, 'red', true, 5 , 'black');
		this.drawText(toHHMMSS(this.#clock), 20, 430, 350, 'cyan', true, 5 , 'black');
		this.drawText('SCORE: ' + this.#score, 15, 380, 400, 'lightgreen', true, 5 , 'black');
		this.drawText('CLEAR: ' + this.#line, 15, 380, 440, 'orange', true, 5 , 'black');
		this.ct.shadowBlur = 0;
		this.ct.shadowColor = "white";

		// Draw Next Brick UI
		this.drawText('NEXT',25, 360, 40, 'black', true, 3, 'white');
		this.ct.fillStyle = 'rgba(128, 128, 128, 0.9)';
		this.ct.fillRect(360, 60, 180, 180);
		this.ct.strokeStyle = 'silver';
		this.ct.lineWidth = 8;
		this.ct.strokeRect(360, 60, 6 * SIZE, 6 * SIZE);
		this.ct.lineWidth = 1;
		//this.drawCaro(0,4,COLS,ROWS-4);
		//this.drawCaro(12,6, 6, 6);

		// Draaw Player Name
		this.drawText('Playername', 20, 350, 520, 'blue', true, 3, 'white');
		this.drawText(this.playerName, 20, 350, 550, 'white', true, 3, 'darkblue');
	}

	addScore() {
		let count = this.board.checkBoard();

		if( count ) {
			setTimeout( () => {
				let score = count * 10 * (1 + (count-1) * 0.2);
				this.#score += score;
				this.#line += count;
			}, 300);
			sound[1].play();
		}
	}

	update() {
		this.addScore();
	}

	draw() {
		this.drawBoard();
		this.board.draw();
		this.brick[0].draw();
		this.brick[1].draw(10,6);
	}
}

window.onload = function() {
	var game = new Game();
}

