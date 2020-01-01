class Brick {
	constructor(game) {
		this.game = game;
		this.dots = [];
		this.type = [];
		this.shape = [];
		this.dir = null;
		this.color = null;
		this.init();
	}

	init() {
		this.col = 3;
		this.row = -2;

		let r = Math.floor(Math.random() * 6);
		this.color = CL[r];
		switch(r) {
			case 0: this.type = I; break;
			case 1: this.type = T; break;
			case 2: this.type = S; break;
			case 3: this.type = Z; break;
			case 4: this.type = O; break;
			case 5: this.type = J; break;
			case 6: this.type = L; break;
		};
		this.dir = Math.floor(Math.random() * 4);
		this.shape = this.type[this.dir];
		this.createDots();
	}

	createDots() {
		for (let row = 0; row < this.shape.length; row++) {
			for (let col = 0; col < this.shape[0].length; col++) {
				if(this.shape[row][col] == X) {
					let newDot = new Dot(this.game, this.row + row, this.col + col, this.color);
					this.dots.push(newDot);
				}
			}
		}
		
	}

	canRotate() {
		let newDir = this.dir + 1;
		if(newDir == 4) newDir = 0;

		let newShape = this.type[newDir];
		let newDots = [];
		for (let row = 0; row < newShape.length; row++) {
			for (let col = 0; col < newShape[0].length; col++) {
				if(newShape[row][col] == X) {
					let newDot = new Dot(this.game, this.row + row, this.col + col, this.color);
					newDots.push(newDot);
				}
			}
		}

		let isCan = true;
		newDots.forEach( (dot) => {
			if(!this.game.board.isEmpty(dot.row, dot.col)) isCan = false;
			if(dot.col < 0 || dot.col > 9) isCan = false;;
		});

		return isCan;
	}
	
	rotate() {
		if(this.canRotate()) {
			this.dots = [];
			this.dir++;
			if(this.dir == 4) this.dir = 0;
			this.shape = this.type[this.dir];
			this.createDots();
		}
	}
	
	canFall() {
		let isCan = true;
		this.dots.forEach( (dot) => {
			if(!dot.canFall()) isCan = false;
		});

		return isCan;
	}

	fall() {
		if (this.canFall()) {
			this.dots.forEach( (dot) => {
				dot.fall();
			});
			this.row++;
			return true;
		}
		else {
			this.dots.forEach( (dot) => {
				this.game.board.addDot(dot);
			});
			this.game.board.checkBoard();
			this.game.brick = new Brick(this.game);
			return false;
		}
	}

	instantFall() {
		if(this.fall()) return this.instantFall();
	}

	canMoveLeft() {
		let isCan = true;
		this.dots.forEach( (dot) => {
			if(!dot.canMoveLeft()) isCan = false;
		});
		return isCan;
	}

	moveLeft() {
		if(this.canMoveLeft()) {
			this.dots.forEach( (dot) => {
				dot.moveLeft();
			});
			this.col--;
		}
	}

	canMoveRight() {
		let isCan = true;
		this.dots.forEach( (dot) => {
			if(!dot.canMoveRight()) isCan = false;
		});
		return isCan;
	}

	moveRight() {
		if(this.canMoveRight()) {
			this.dots.forEach( (dot) => {
				dot.moveRight();
			});
			this.col++;
		}
	}
	
	update() {

	}

	draw() {
		this.dots.forEach( (dot) => {
			dot.draw();
		});
	}
}