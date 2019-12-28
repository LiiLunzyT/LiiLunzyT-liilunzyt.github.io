const SIZE = 32;

const ROWS = 20;
const COLS = 10;

const WIDTH = 640;
const HEIGHT = 640;
const SCORE_WIDTH = 320;

// Color 
const CL = ['red', 'blue', 'yellow', 'green', 'brown', 'purple', 'orange']
// Key
const K_UP = 'ArrowUp';
const K_DOWN = 'ArrowDown';
const K_LEFT = 'ArrowLeft';
const K_RIGHT = 'ArrowRight';

// Type of Bricks
const _ = 0;
const X = 1;
const T = [
			[
				[_,X,_],
				[X,X,X],
				[_,_,_]
			],
			[
				[_,X,_],
				[_,X,X],
				[_,X,_]
			],
			[
				[_,_,_],
				[X,X,X],
				[_,X,_]
			],
			[
				[_,X,_],
				[X,X,_],
				[_,X,_]
			]
];

const Z = [
			[
				[X,X,_],
				[_,X,X],
				[_,_,_]
			],
			[
				[_,_,X],
				[_,X,X],
				[_,X,_]
			],
			[
				[_,_,_],
				[X,X,_],
				[_,X,X]
			],
			[
				[_,X,_],
				[X,X,_],
				[X,_,_]
			]
];

const S = [
			[
				[_,X,X],
				[X,X,_],
				[_,_,_]
			],
			[
				[_,X,_],
				[_,X,X],
				[_,_,X]
			],
			[
				[_,_,_],
				[_,X,X],
				[X,X,_]
			],
			[
				[X,_,_],
				[X,X,_],
				[_,X,_]
			]
];

const O = [
			[
				[_,_,_,_],
				[_,X,X,_],
				[_,X,X,_],
				[_,_,_,_]
			],[
				[_,_,_,_],
				[_,X,X,_],
				[_,X,X,_],
				[_,_,_,_]
			],[
				[_,_,_,_],
				[_,X,X,_],
				[_,X,X,_],
				[_,_,_,_]
			],[
				[_,_,_,_],
				[_,X,X,_],
				[_,X,X,_],
				[_,_,_,_]
			],[
				[_,_,_,_],
				[_,X,X,_],
				[_,X,X,_],
				[_,_,_,_]
			],
];

const I = [
			[
				[_,_,_,_],
				[X,X,X,X],
				[_,_,_,_],
				[_,_,_,_]
			],
			[
				[_,_,X,_],
				[_,_,X,_],
				[_,_,X,_],
				[_,_,X,_]
			],
			[
				[_,_,_,_],
				[_,_,_,_],
				[X,X,X,X],
				[_,_,_,_]
			],
			[
				[_,X,_,_],
				[_,X,_,_],
				[_,X,_,_],
				[_,X,_,_]
			]
];

const L = [
			[
				[_,_,X],
				[X,X,X],
				[_,_,_]
			],
			[
				[_,X,_],
				[_,X,_],
				[_,X,X]
			],
			[
				[_,_,_],
				[X,X,X],
				[X,_,_]
			],
			[
				[X,X,_],
				[_,X,_],
				[_,X,_]
			]
];

const J = [
			[
				[X,_,_],
				[X,X,X],
				[_,_,_]
			],
			[
				[_,X,X],
				[_,X,_],
				[_,X,_]
			],
			[
				[_,_,_],
				[X,X,X],
				[_,_,X]
			],
			[
				[_,X,_],
				[_,X,_],
				[X,X,_]
			]
];
