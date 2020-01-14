// KEY
const K_UP = 'ArrowUp';
const K_LEFT = 'ArrowLeft';
const K_DOWN = 'ArrowDown';
const K_RIGHT = 'ArrowRight';
const K_SPACE = 'Space';
const K_ENTER = 'Enter';
const K_SHIFTLEFT = 'ShiftLeft';
const K_P = 'KeyP';
const K_E = 'KeyE';
const K_W = 'KeyW';
const K_A = 'KeyA';
const K_S = 'KeyS';
const K_D = 'KeyD';
const K_L = 'KeyL';
const K_K = 'KeyK';


// BOARD
const BOARD_COLOR = 'gray';
const BOARD_OUTLINE_COLOR = 'black';
const SIZE = 30;
const WIDTH = 600;
const HEIGHT = 600;

const ROWS = 24;
const COLS = 10;

// COLOR
const B_COLOR = [
	'rgba(255, 0  , 0  , 1.0)',	// 0 - RED
	'rgba(0  , 255, 0  , 1.0)',	// 1 - GREEN
	'rgba(0  , 0  , 255, 1.0)',	// 2 - BLUE
	'rgba(128, 0  , 128, 1.0)',	// 3 - PURPLE
	'rgba(255, 255, 0  , 1.0)',	// 4 - YELLOW
	'rgba(255, 127, 0  , 1.0)',	// 5 - ORANGE
	'rgba(128, 76 , 51 , 1.0)',	// 6 - BROWN
];

const S_COLOR = [
	'rgba(255, 0  , 0  , 0.1)',	// 0 - RED
	'rgba(0  , 255, 0  , 0.1)',	// 1 - GREEN
	'rgba(0  , 0  , 255, 0.1)',	// 2 - BLUE
	'rgba(75 , 0  , 130, 0.1)',	// 3 - PURPLE
	'rgba(255, 255, 0  , 0.1)',	// 4 - YELLOW
	'rgba(255, 127, 0  , 0.1)',	// 5 - ORANGE
	'rgba(128, 76 , 51 , 0.1)',	// 6 - BROWN
];

const C_COLOR = [
	'rgba(255, 0  , 0  , 0.7)',	// 0 - RED
	'rgba(0  , 255, 0  , 0.7)',	// 1 - GREEN
	'rgba(0  , 0  , 255, 0.7)',	// 2 - BLUE
	'rgba(75 , 0  , 130, 0.7)',	// 3 - PURPLE
	'rgba(255, 255, 0  , 0.7)',	// 4 - YELLOW
	'rgba(255, 127, 0  , 0.7)',	// 5 - ORANGE
	'rgba(128, 76 , 51 , 0.7)',	// 6 - BROWN
];
var sound = [
	new Audio('sound/fall.wav'),
	new Audio('sound/clear.wav'),
	new Audio('sound/rotate.wav'),
	new Audio('sound/move.wav'),
	new Audio('sound/gameover.wav'),
];

sound.forEach( (s) => {
	s.volume = 0.1;
});