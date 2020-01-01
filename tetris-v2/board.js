class Board {
	constructor(game) {
		this.game = game;

		this.data = null;
		this.dots = null;

		this.init();
	}

	init() {
		this.data = [
			[_,_,_,_,_,_,_,_,_,_], // 0        ==> Not display
			[_,_,_,_,_,_,_,_,_,_], // 2        ==> Not display
			[_,_,_,_,_,_,_,_,_,_], // 3        ==> Not display
			[_,_,_,_,_,_,_,_,_,_], // 4        ==> Not display
			[_,_,_,_,_,_,_,_,_,_], // 5
			[_,_,_,_,_,_,_,_,_,_], // 6
			[_,_,_,_,_,_,_,_,_,_], // 7
			[_,_,_,_,_,_,_,_,_,_], // 8
			[_,_,_,_,_,_,_,_,_,_], // 9
			[_,_,_,_,_,_,_,_,_,_], // 10
			[_,_,_,_,_,_,_,_,_,_], // 11
			[_,_,_,_,_,_,_,_,_,_], // 12
			[_,_,_,_,_,_,_,_,_,_], // 13
			[_,_,_,_,_,_,_,_,_,_], // 14
			[_,_,_,_,_,_,_,_,_,_], // 15
			[_,_,_,_,_,_,_,_,_,_], // 16
			[_,_,_,_,_,_,_,_,_,_], // 17
			[_,_,_,_,_,_,_,_,_,_], // 18
			[_,_,_,_,_,_,_,_,_,_], // 19
			[_,_,_,_,_,_,_,_,_,_], // 29
			[_,_,_,_,_,_,_,_,_,_], // 21
			[_,_,_,_,_,_,_,_,_,_], // 22
			[_,_,_,_,_,_,_,_,_,_], // 23
			[_,_,_,_,_,_,_,_,_,_], // 23
		];
		this.dots = [];
	}

	isEmpty(row, col) {
		return !this.data[row][col];
	}

	addBrick(dots) {
		dots.forEach( (dot) => {
			this.dots.push(dot);
			this.data[dot.row][dot.col] = X;
		});
	}

	drawCaro() {
		this.game.ct.strokeStyle = 'rgba(128, 128, 128, 1)';
		for(let row = 0; row < ROWS; row++) {
			for(let col = 0; col < COLS; col++) {
				let x = col * SIZE;
				let y = (row - 4) * SIZE;
				this.game.ct.strokeRect(x, y, SIZE, SIZE);
			}
		}
	}

	draw() {
		this.drawCaro();
		this.dots.forEach( (dot) => {
			dot.draw();
		});
	}
}