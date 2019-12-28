class Board {
	constructor(game) {
		this.game = game;
		this.data = [];
		this.dots = [];
		this.init();
	}

	init() {
		this.data = [
			[_,_,_,_,_,_,_,_,_,_], // 1
			[_,_,_,_,_,_,_,_,_,_], // 2
			[_,_,_,_,_,_,_,_,_,_], // 3
			[_,_,_,_,_,_,_,_,_,_], // 4
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
			[_,_,_,_,_,_,_,_,_,_], // 20
		];
	}

	checkBoard() {
		for(let row = 0; row < ROWS;) {
			if(this.checkFullRow(row)) {
				this.drop(row);
			}
			else row++;
		}
	}

	checkFullRow(row) {
		let isFull = true;
		for(let col = 0; col < COLS; col++) {
			if(this.data[row][col] == _) isFull = false;
		}

		return isFull;
	}

	drop(row) {
		this.data.splice(row, 1);
		this.data.unshift([_,_,_,_,_,_,_,_,_,_]);

		this.dots = this.dots.filter( (dot) => {
			return dot.row != row;
		});
		this.dots.forEach( (dot) => {
			if(dot.row < row) dot.row++;
		}); 
	}

	isEmpty(row, col) {
		if(row < 0) return true;
		return !this.data[row][col];
	}

	addDot(dot) {
		this.dots.push(dot);
		this.data[dot.row][dot.col] = X;
	}
	
	draw() {
		this.dots.forEach( (dot) => {
			dot.draw();
		});
	}
}