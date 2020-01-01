class Brick {
	constructor(game) {
		this.game = game;

		this.dots = null;
		this.shadow = null;
		this.color = null;
		this.fallInterval = null;
		this.isStop = null;

		this.type = null;
		this.shape = null;
		this.dir = null;
		this.col = null;
		this.row = null;

		this.init();
	}

	init() {
		this.dots = [];
		this.shadow = [];
		this.color = "";
		this.type = [];
		this.shape = [];
		this.dir = 0;
		this.isStop = false;

		this.col = 3;
		this.row = 1;

		this.createShape();
		this.createDots();

		this.setFallInterval(500);
	}

	createDots() {
		for(let row = 0; row < this.shape.length; row++) {
			for(let col = 0; col < this.shape[0].length; col++) {
				if( this.shape[row][col] == X) {
					let dot = new Dot(this.game, row + this.row, col + this.col, this.color	);
					this.dots.push(dot);
				}
			}
		}
	}

	createShape() {
		let r = Math.floor(Math.random() * 7);
		this.dir = Math.floor(Math.random() * 4);

		let listType = [ T , Z , S , L , J , I , O];
		this.type = listType[r];
		this.shape = this.type[this.dir];
		this.color = B_COLOR[r];
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
		if(this.canRotate() && !this.isStop) {
			sound[3].play();
			this.dots = [];
			this.dir++;
			if(this.dir == 4) this.dir = 0;
			this.shape = this.type[this.dir];
			this.createDots();
		}
	}

	updateShadow() {
		this.shadow = this.shape;
		let shapeY;
		for(let shapeY = 23; shapeY > 4; shapeY--) {
			this.dots.forEach( (dot) => {
				
			});
		}
	}

	setFallInterval(delay) {
		this.fallInterval = setInterval( () => {
			this.fall();
		}, delay);
	}

	canMoveLeft() {
		let isCan = true;
		this.dots.forEach( (dot) => {
			if( !dot.canMoveLeft() ) isCan = false;
		});
		return isCan;
	}

	moveLeft() {
		if( this.canMoveLeft() && !this.isStop) {
			sound[2].play();
			this.dots.forEach( (dot) => {
				dot.moveLeft();
			});
			this.col--;
		}
	}

	canMoveRight() {
		let isCan = true;
		this.dots.forEach( (dot) => {
			if( !dot.canMoveRight() ) isCan = false;
		});
		return isCan;
	}

	moveRight() {
		if( this.canMoveRight() && !this.isStop) {
			sound[2].play();
			this.dots.forEach( (dot) => {
				dot.moveRight();
			});
			this.col++;
		}
	}

	isCanFall() {
		let isCan = true;
		this.dots.forEach( (dot) => {
			if( !dot.isCanFall() ) isCan = false;
		});
		return isCan;
	}


	fall() {
		if ( this.isCanFall() ) {
			this.dots.forEach( (dot) => {
				dot.fall();
			}); 
			this.row++;
			this.game.board.checkBoard();
			return true;
		}
		else {
			sound[0].play();
			clearInterval(this.fallInterval);
			this.game.board.addBrick(this.dots);
			this.init();
			return false;
		}
	}

	instantFall() {
		if(this.fall() && !this.isStop) return this.instantFall();
	}

	Pause() {
		clearInterval(this.fallInterval);
		this.isStop = true;
	}

	unPause() {
		this.setFallInterval(500);
		this.isStop = false;
	}

	draw() {
		this.dots.forEach( (dot) => {
			dot.draw();
		});
	}
}