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

	checkBoard() {
		let count = 0;
		let rowFull = [];
		for(let row = 4; row < ROWS; row++) {
			if(this.checkFullRow(row)) {
				rowFull.push(row);
				this.fullRowChangeColor(row);
				count++;
			}
		}
		if(count) {
			setTimeout( () => {
				this.drop(rowFull);

				let score = count * 10 * (1 + (count-1) * 0.2);
				this.game.score += score;
				this.game.line += count;
			}, 300);
			sound[1].play();
		}	
	}

	fullRowChangeColor(row) {
		let i = 0;
		this.dots.forEach( (dot) => {
			if( dot.row == row ) {
				setTimeout( () => {
					let r = Math.floor(Math.random() * 7);
					dot.color = C_COLOR[r];
				}, i*25);
				i += 1;
			}
		});
	}

	checkFullRow(row) {
		let isFull = true;
		for(let col = 0; col < COLS; col++) {
			if(this.data[row][col] == _) isFull = false;
		}

		return isFull;
	}

	drop(rowFull) {
		rowFull.forEach( (row) => {
			this.data.splice(row, 1);
			this.data.unshift([_,_,_,_,_,_,_,_,_,_]);

			this.dots = this.dots.filter( (dot) => {
				return dot.row != row;
			});

			this.dots.forEach( (dot) => {
				if(dot.row < row) dot.row++;
			});
		});
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

	drawCaro(x1,y1,x2,y2) {
		this.game.ct.save();
		this.game.ct.strokeStyle = 'rgba(128, 128, 128, 1)';
		for(let row = y1; row < y2+y1; row++) {
			for(let col = x1; col < x2+x1; col++) {
				let x = col * SIZE;
				let y = (row - 4) * SIZE;
				this.game.ct.strokeRect(x, y, SIZE, SIZE);
			}
		}
		this.game.ct.restore();
	}

	draw() {
		this.drawCaro(0,4,COLS,ROWS-4);
		this.drawCaro(12,6, 6, 6);

		this.dots.forEach( (dot) => {
			dot.draw();
		});
	}
}