class Dot {
	constructor(game, row, col, color = 'red') {
		this.game = game;
		this.row = row;
		this.col = col;
		this.color = color;

		if( !this.game.board.isEmpty(this.row, this.col)) return this.game.End();
	}

	canMoveLeft() {
		return this.game.board.isEmpty(this.row, this.col - 1) && this.col > 0;
	}

	moveLeft() {
		this.col--;
	}

	canMoveRight() {
		return this.game.board.isEmpty(this.row, this.col + 1) && this.col < 9;
	}

	moveRight() {
		this.col++;
	}

	isHitBottom() {
		return this.row == 23;
	}

	isBelowEmpty() {
		return this.game.board.isEmpty(this.row + 1, this.col);
	}

	isCanFall() {
		let isCan = true;
		if( this.isHitBottom() ) isCan = false;
		else if( !this.isBelowEmpty() ) isCan = false;

		return isCan;
	}

	fall() {
		this.row++;
	}

	draw(x_offset = 0, y_offset = 0) {
		// get position
		let x = (this.col + x_offset) * SIZE;
		let y = (this.row + y_offset - 4) * SIZE;

		// draw outline
		this.game.ct.strokeStyle = 'black';
		this.game.ct.strokeRect(x + 1, y + 1, SIZE - 2, SIZE - 2);
		// draw box

		this.game.ct.fillStyle = this.color;
		this.game.ct.fillRect(x + 2, y + 2, SIZE - 4, SIZE - 4);
	}
}