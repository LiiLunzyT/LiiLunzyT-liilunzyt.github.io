class Brick {
	constructor(game, row, col) {
		this.game = game;

		this.dots = null;
		this.shadow = null;
		this.color = null;
		this.s_color = null;
		this.isStop = null;
		this.isFastMove = null;

		this.type = null;
		this.shape = null;
		this.dir = null;
		this.col = null;
		this.row = null;
		this.haveMove = null;

		this.nextBrick = null;
		this.init();
	}

	init() {
		this.dots = [];
		this.shadow = [];
		this.color = "";
		this.s_color = "";
		this.type = [];
		this.shape = [];
		this.dir = 0;
		this.isStop = false;
		this.isFastMove = false;

		this.col = 3;
		this.row = 1;
		this.haveMove = 0;

		this.createShape();
		this.createDots();
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
		this.s_color = S_COLOR[r];
	}

	canMove() {
		return !this.isStop && !this.isFastMove;
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
		if(this.canRotate() && this.canMove()) {
			sound[3].play();
			this.dots = [];
			this.dir++;
			this.haveMove++;
			if(this.dir == 4) this.dir = 0;
			this.shape = this.type[this.dir];
			this.createDots();
			this.updateShadow();
		}
	}

	updateShadow() {
		this.shadow = [];
		let y = 0;

		for(y = this.dots[3].row + 1; y <= 23; y++) {
			let check = true;
			this.dots.forEach( (dot) => {
				if( !this.game.board.isEmpty(y - this.dots[3].row + dot.row, dot.col) ) check  = false;
			});
			if( !check ) break;
		}

		y--;
		this.dots.forEach( (dot) => {
			this.shadow.push([y - this.dots[3].row + dot.row, dot.col]);
		});
	}

	canMoveLeft() {
		let isCan = true;
		this.dots.forEach( (dot) => {
			if( !dot.canMoveLeft() ) isCan = false;
		});
		return isCan;
	}

	moveLeft() {
		if( this.canMoveLeft() && this.canMove()) {
			sound[2].play();
			this.dots.forEach( (dot) => {
				dot.moveLeft();
			});
			this.col--;
			this.haveMove++;
			this.updateShadow();
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
		if( this.canMoveRight() && this.canMove()) {
			sound[2].play();
			this.dots.forEach( (dot) => {
				dot.moveRight();
			});
			this.col++;
			this.haveMove++;
			this.updateShadow()
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
			this.haveMove++;
			this.updateShadow();
			return true;
		}
		else {
			if(this.haveMove == 0) return this.game.End();
			sound[0].play();
			this.game.board.addBrick(this.dots);
			this.game.brick.shift();
			this.game.brick.push(new Brick(this.game));
			return false;
		}
	}

	instantFall() {
		if(this.fall() ) {
			return setTimeout( () => {
				this.instantFall();
				this.isFastMove = true;
			}, 1000 / 60);
		} else {
			this.isFastMove = false;
		}
	}

	Pause() {
		this.isStop = true;
	}

	unPause() {
		this.isStop = false;
	}

	draw(x_offset = 0, y_offset = 0) {
		// Draw brick
		this.dots.forEach( (dot) => {
			dot.draw(x_offset, y_offset);
		});

		// Draw shadow
		this.shadow.forEach( (dot) => {
			let x = dot[1] * SIZE;
			let y = (dot[0] - 4) * SIZE;

			// draw outline
			this.game.ct.strokeStyle = 'rgba(0, 0, 0, 0.5)';
			this.game.ct.strokeRect(x + 2, y + 2, SIZE - 4, SIZE - 4);
			// draw box

			this.game.ct.fillStyle = this.s_color;
			this.game.ct.fillRect(x + 3, y + 3, SIZE - 6, SIZE - 6);
		});
	}
}