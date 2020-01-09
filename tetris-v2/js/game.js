

class Game {
	constructor() {
		this.cv = null;
		this.ct = null;

		this.isRunning = null;
		this.isPause = null;
		this.drawInterval = null;
		this.fallInterval = null;
		this.clockInterval = null;

		this.board = null;
		this.brick = null;
		this.score = null;
		this.line = null;
		this.clock = null;
		this.playerName = null;
		this.history = null;
		this.highscore = null;

		this.init();
	}

	init() {
		// Get player name
		this.playerName = window.prompt("Nhập tên người chơi (tối đa 10 ký tự)","noname");
		if(this.playerName == null) {
			this.playerName = "noname";
		}

		// Get canvas
		this.cv = document.getElementById('game-canvas');
		this.ct = this.cv.getContext('2d');
		this.ct.translate(0.5, 0.5);

		// set size game-canvas
		this.cv.width = WIDTH;
		this.cv.height = HEIGHT;

		// Set variables
		this.isRunning = false;
		this.isPause = false;

		this.clock = 0;
		this.score = 0;
		this.line = 0;
		this.history = [];
		this.highscore = [];

		// Load Highscore
		this.loadHistory();
		this.loadHighscore();

		// Intro
		this.drawBoard();
		this.drawIntro();

		// add Key listener
		this.readKeyPress();
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
			switch(event.code) {
				case K_ENTER: this.Start(); break;
				case K_UP: this.brick[0].rotate(); break;
				case K_DOWN: this.brick[0].fall(); break;
				case K_LEFT: this.brick[0].moveLeft(); break;
				case K_RIGHT: this.brick[0].moveRight(); break;
				case K_SPACE: this.brick[0].instantFall(); break;
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
			this.clock = 0;
			this.loadHistory();
			this.loadHighscore();

			this.clockInterval = setInterval( () => {
				this.clock += 1;
			}, 1000);
			this.drawInterval = setInterval( () => {
				this.update();
				this.draw();
			}, 30);
			this.fallInterval = setInterval( () => {
				this.brick[0].fall();
			}, 700);
		}
	}

	End() {
		this.ct.save();
		if( this.isRunning) {
			this.board = null;
			clearInterval(this.fallInterval);
			this.brick = null;
			clearInterval(this.drawInterval);
			this.isRunning = false;
			clearInterval(this.clockInterval);

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

			this.drawText('Press Enter for', 20, 60, 380, 'red',);
			this.drawText('NEW GAME', 20, 90, 410, 'red',);

			// get Day Time
			let today = new Date();
			let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			let dateTime = date+'\n'+time;

			// Save Score
			let data = {
				"time"  : dateTime,
				"name" : this.playerName,
				"score" : this.score,
				"clock" : toHHMMSS(this.clock)
			}

			this.history.unshift(data);
			setLocalStorage('highscore', this.history);
		}
		this.ct.restore();
	}

	Pause() {
		this.ct.save();
		if( !this.isPause ) {
			console.log('GAME PAUSE');
			clearInterval(this.drawInterval);
			clearInterval(this.fallInterval);
			clearInterval(this.clockInterval);
			this.brick[0].Pause();
			this.isPause = true;
 			
			this.ct.font = '30px Arial';
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
		this.ct.restore();
	}

	unPause() {
		this.clockInterval = setInterval( () => {
			this.clock += 1;
		}, 1000);
		this.drawInterval = setInterval( () => {
			this.draw();
		}, 50);
		this.fallInterval = setInterval( () => {
			this.brick[0].fall();
		}, 700);
		this.brick[0].unPause();
	}

	drawText(text, size, x, y, color = 'white', stroke = false, lWidth = 1, s_color = 'black') {
		this.ct.save();
		this.ct.font = size + "px Arial";
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
		this.ct.save();
		this.ct.font = '21px Arial';
		this.ct.lineWidth = 8;
		this.ct.strokeStyle = 'black';
		this.ct.strokeText('PRESS ENTER TO START', 20, 300);
		this.ct.fillStyle = 'white';
		this.ct.fillText('PRESS ENTER TO START', 20, 300);
		this.ct.lineWidth = 1;
		this.ct.restore();
	}

	clearBoard () {
		// clear board
		this.ct.clearRect(0, 0, WIDTH/2, HEIGHT);
		this.ct.clearRect(365, 65, 170, 170);
	}
		// draw Main Board
	
	drawBoard() {
		// draw Stat board
		this.ct.save();
		this.ct.lineWidth = 8;
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
		this.ct.shadowBlur = 10;
		this.ct.shadowColor = "green";
		this.ct.lineWidth = 6;
		this.ct.strokeStyle = 'white';
		this.ct.stroke();
		this.drawText('CLOCK : ' + this.clock, 25, 370, 330, 'black', true, 2 , 'white');
		this.drawText('SCORE : ' + this.score, 25, 370, 380, 'black', true, 2 , 'white');
		this.drawText('CLEAR : ' + this.line, 25, 370, 430, 'black', true, 2 , 'white');
		this.ct.shadowBlur = 0;
		this.ct.shadowColor = "white";

		// Draw Next Brick UI
		this.drawText('NEXT',30, 360, 40);
		this.ct.fillStyle = 'rgba(128, 128, 128, 0.9)';
		this.ct.fillRect(360, 60, 180, 180);
		this.ct.strokeStyle = 'white';
		this.ct.strokeRect(360, 60, 6 * SIZE, 6 * SIZE);
		this.ct.restore();
	}

	drawStat() {
		// Next brick box
		this.ct.save();
		this.ct.fillStyle = 'black';
		this.ct.fillRect(365, 65, 170, 170);
		this.ct.fillStyle = 'rgba(128, 128, 128, 0.8)';
		this.ct.fillRect(365, 65, 170, 170);

		// Score Box
		this.ct.shadowBlur = 10;
		this.ct.shadowColor = "green";
		this.ct.clearRect(360, 300, 190, 150);
		this.drawText('CLOCK : ' + toHHMMSS(this.clock), 25, 370, 330, 'black', true, 2 , 'white');
		this.drawText('SCORE : ' + this.score, 25, 370, 380, 'black', true, 2 , 'white');
		this.drawText('CLEAR : ' + this.line, 25, 370, 430, 'black', true, 2 , 'white');
		this.ct.shadowBlur = 0;
		this.ct.shadowColor = "white";
		this.ct.restore();
	}

	update() {

	}

	draw() {
		this.clearBoard();
		this.drawStat();
		this.board.draw();
		this.brick[0].draw();
		this.brick[1].draw(10,6);
	}
}

var game = new Game();