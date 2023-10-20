//Sliding Puzzle game by Lazy-Coder-03
let source;
let tiles = [];
let cols = 3;
let rows = 3
;
let w, h;

let board = [];

function preload() {
  source = loadImage("mcluc.jpg");
}

function setup() {
  createCanvas(800, 400);
  w = width / (2 * cols);
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(floor(w), floor(h));
      img.copy(source, x, y, floor(w), floor(h), 0, 0, floor(w), floor(h));
      let index = i + j * cols;
      push();
      translate(x, y);
      fill(255);
      text(index, 0, 0);
      pop();
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }

  tiles.pop();
  board.pop();
  // -1 means an empty spot
  board.push(-1);
  simpleShuffle(board);
}


function swap(i, j, arr) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function randomMove(arr) {
  let r1 = floor(random(cols));
  let r2 = floor(random(rows));
  myMove(r1, r2, arr);
}

function simpleShuffle(arr) {
  for (let i = 0; i < 100000; i++) {
    randomMove(arr);
  }
}

function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  myMove(i, j, board);
}

function draw() {
  background(0);
  image(source,400,0)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        let img = tiles[tileIndex].img;
        image(img, x, y, w, h);
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      strokeWeight(2);
      noFill();
      rect(x, y, w, h);
    }
  }

  if (isSolved()) {
    console.log("SOLVED");
    textSize(64)
    textAlign(CENTER,CENTER)
    stroke(255)
    fill(0)
    text("SOLVED !!!",width/4,height/2)
    noLoop()
//     setTimeout(function() {
//     startOver();
// }, 1000);

  }
}

function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

function myMove(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / rows);
  if (isNeighbor(i, j, blankCol, blankRow)) {
    swap(blank, i + j * cols, arr);
  }
}

function isNeighbor(i, j, x, y) {
  if (i !== x && j !== y) {
    return false;
  }

  if (abs(i - x) == 1 || abs(j - y) == 1) {
    return true;
  }
  return false;
}
function findBlank() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) return i;
  }
}
function startOver() {
  if (confirm("Do you want to start a new game?")) {
    board = [];
    for (let i = 0; i < cols * rows; i++) {
      board.push(i);
    }
    board.pop(); 
    simpleShuffle(board);
    //loop();
  }
}

class Tile {
  constructor(i, img) {
    this.index = i;
    this.img = img;
  }
}