class Cell {
    constructor(ct, row, col, value) {
        this.ct = ct;
        this.row = row;
        this.col = col;
        this.value = value;
        this.clicked = false;
        this.stt = false;
    } 

    click(mode) {
        if( !this.clicked) {
            switch(mode) {
                case 'reveal':
                    this.reveal();
                    break;
                case 'flag':
                    break;
            }
        }
    }

    getAroundBomb() {
        let count = 0;
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
            }
        }
    }

    isBomb() {
        return this.value === 'bomb';
    }

    reveal() {
        if( !this.isBomb() ) {
            console.log('click');
            ct.fillStyle = 'black';
            ct.font = "20px Arial";
            ct.fillText(this.value, this.col * 30 + 10, this.row * 30 + 20);
        } else {
            ct.fillStyle = 'black';
            ct.font = "20px Arial";
            ct.fillText('#', this.col * 30 + 10, this.row * 30 + 20);
        }
    }

    flag() {

    }
}