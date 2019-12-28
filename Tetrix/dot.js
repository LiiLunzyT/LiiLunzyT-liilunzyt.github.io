class Dot {
	constructor(game, row, col, color = 'red') {
		this.game = game;
		this.row = row;
		this.col = col;
		this.color = color;
	}

	isHitBottom() {
		return this.row == ROWS - 1;
	}

	canFall() {
		if(this.isHitBottom()) return false;
		if(!this.game.board.isEmpty(this.row + 1, this.col)) return false;

		return true;
	}

	fall() {
		this.row++;
	}

	canMoveLeft() {
		if(this.col == 0) return false;
		if(this.game.board.isEmpty(this.row, this.col - 1)) return true;
		return false;
	}

	moveLeft() {
		this.col--;	
	}

	canMoveRight() {
		if(this.col == 9) return false;
		if(this.game.board.isEmpty(this.row, this.col + 1)) return true;
		return false;
	}

	moveRight() {
		this.col++;	
	}

	update() {
	}

	draw() {
		let x = this.col * SIZE;
		let y = this.row * SIZE;
		this.game.context.strokeStyle = 'black';
		this.game.context.strokeRect(x, y, SIZE, SIZE);
		this.game.context.fillStyle = this.color;
		this.game.context.fillRect(x + 2, y + 2, SIZE - 2, SIZE - 2);
	}
}