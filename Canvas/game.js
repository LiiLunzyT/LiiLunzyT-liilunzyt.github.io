let cv = document.getElementById('canvas');
let ct = cv.getContext('2d');
let cell = [];
init();

function init() {
    for(let row = 0; row < 20; row++) {
        for(let col = 0; col < 20; col++) {
            let c = new Cell(ct, row, col, 'bomb');
            cell.push(c);
        }
    }
}

function generateBomb() {
    for(let row = 0; row < 20; row++) {
        let rows = [];
        for(let col = 0; col < 20; col++) {
            
        }
        cell.push(rows);
    }
}

function cellClick(x, y) {
    let row = Math.floor(y / 30);
    let col =  Math.floor(x / 30);

    cell.forEach( (c) => {
        if(c.row == row && c.col == col) c.click('reveal');
    });
}

cv.addEventListener('click', function(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    cellClick(x, y);
});

function drawCaro() {
    for(let row = 0; row < 20; row++) {
        for(let col = 0; col < 20; col++) {
            let y = row * 30;
            let x = col * 30;
            ct.strokeStyle = 'white';
            ct.strokeRect(x, y, 30, 30);
        }
    }
}

function fillRed(x, y) {
    x = x - x % 30;
    y = y - y % 30;
    ct.fillStyle = 'red';
    ct.fillRect(x + 1, y + 1, 28, 28); 
}

function getRandFromArray(array) {
    let len = array.length;
    let r = Math.floor(Math.random() * len);
    return array[r];
}

drawCaro();