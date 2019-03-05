const DIR_ALL = Hammer.DIRECTION_ALL;
const DIR_V = Hammer.DIRECTION_VERTICAL;
const DIR_U = Hammer.DIRECTION_UP;
const DIR_D = Hammer.DIRECTION_DOWN;
const DIR_H = Hammer.DIRECTION_HORIZONTAL;
const DIR_L = Hammer.DIRECTION_LEFT;
const DIR_R = Hammer.DIRECTION_R;

class TouchController {
  constructor(padEl, xEl, aEl, bEl, yEl) {
    this.pad = padEl;
    this.x = xEl;
    this.a = aEl;
    this.b = bEl;
    this.y = yEl;
    this.attachElementGestures();
  }

  attachElementGestures() {
    this.padHammer = new Hammer(this.pad);
    this.xHammer = new Hammer(this.x);
    this.aHammer = new Hammer(this.a);
    this.bHammer = new Hammer(this.b);
    this.yHammer = new Hammer(this.y);
  }
}

function initTouchController() {
  const pad = document.getElementById('pad');
  const x = document.getElementById('x');
  const a = document.getElementById('a');
  const b = document.getElementById('b');
  const y = document.getElementById('y');
  return new TouchController(pad, x, a, b, y);
}

let touchController;

window.addEventListener('load', () => {
  touchController = initTouchController();
  console.log(touchController);
});
