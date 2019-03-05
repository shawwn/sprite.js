const DIR_ALL = Hammer.DIRECTION_ALL;
const DIR_V = Hammer.DIRECTION_VERTICAL;
const DIR_U = Hammer.DIRECTION_UP;
const DIR_D = Hammer.DIRECTION_DOWN;
const DIR_H = Hammer.DIRECTION_HORIZONTAL;
const DIR_L = Hammer.DIRECTION_LEFT;
const DIR_R = Hammer.DIRECTION_R;

const pans = {
  LEFT: 'panleft',
  RIGHT: 'panright',
  UP: 'panup',
  DOWN: 'pandown',
};

class TouchController {
  constructor(padEl, xEl, aEl, bEl, yEl) {
    this.pad = padEl;
    this.x = xEl;
    this.a = aEl;
    this.b = bEl;
    this.y = yEl;
    this.bindEvents();
    this.attachPadGestures();
    this.attachButtonGestures();
    this.listenForPadEvents();
    this.listenForButtonTaps();
    this.listenForButtonPresses();
  }

  bindEvents() {
    this.handlePadPan = this.handlePadPan.bind(this);
    this.handlePadPanLeft = this.handlePadPanLeft.bind(this);
    this.handlePadPanRight = this.handlePadPanRight.bind(this);
    this.handlePadPanUp = this.handlePadPanUp.bind(this);
    this.handlePadPanDown = this.handlePadPanDown.bind(this);
    this.handlePadPress = this.handlePadPress.bind(this);
    this.handlePadTap = this.handlePadTap.bind(this);
    this.handleButtonTap = this.handleButtonTap.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handlePadPanLeft(evt) {
    console.log('pan left', evt);
  }

  handlePadPanRight(evt) {
    console.log('pan right', evt);
  }

  handlePadPanUp(evt) {
    console.log('pan up', evt);
  }

  handlePadPanDown(evt) {
    console.log('pan down', evt);
  }

  handlePadPan(evt) {
    const { additionalEvent } = evt;

    switch (additionalEvent) {
      case pans.UP:
        this.handlePadPanUp(evt);
        break;

      case pans.DOWN:
        this.handlePadPanDown(evt);
        break;

      case pans.LEFT:
        this.handlePadPanLeft(evt);
        break;

      case pans.RIGHT:
        this.handlePadPanRight(evt);
        break;

      default:
        break;
    }
  }

  handlePadPress(evt) {
    console.log('press', evt);
  }

  handlePadTap(evt) {
    console.log('tap', evt);
  }

  handleButtonTap(button, evt) {
    console.log(button, 'tap', evt);
  }

  handleButtonPress(button, evt) {
    console.log(button, 'press', evt);
  }

  attachPadGestures() {
    this.padMc = new Hammer.Manager(this.pad);
    this.padMc.add(new Hammer.Pan({ direction: DIR_ALL }));
    this.padMc.add(new Hammer.Press());
    this.padMc.add(new Hammer.Tap());
  }

  attachButtonGestures() {
    this.xMc = new Hammer.Manager(this.x);
    this.aMc = new Hammer.Manager(this.a);
    this.bMc = new Hammer.Manager(this.b);
    this.yMc = new Hammer.Manager(this.y);
    this.xMc.add(new Hammer.Tap());
    this.xMc.add(new Hammer.Press());
    this.aMc.add(new Hammer.Tap());
    this.aMc.add(new Hammer.Press());
    this.bMc.add(new Hammer.Tap());
    this.bMc.add(new Hammer.Press());
    this.yMc.add(new Hammer.Tap());
    this.yMc.add(new Hammer.Press());
  }

  listenForPadEvents() {
    this.padMc.on('pan', this.handlePadPan.bind(this));
    this.padMc.on('press', this.handlePadPress.bind(this));
    this.padMc.on('tap', this.handlePadTap.bind(this));
  }

  listenForButtonTaps() {
    this.xMc.on('tap', (evt) => {
      this.handleButtonTap('x', evt);
    });
    this.aMc.on('tap', (evt) => {
      this.handleButtonTap('a', evt);
    });
    this.bMc.on('tap', (evt) => {
      this.handleButtonTap('b', evt);
    });
    this.yMc.on('tap', (evt) => {
      this.handleButtonTap('y', evt);
    });
  }

  listenForButtonPresses() {
    this.xMc.on('press', (evt) => {
      this.handleButtonPress('x', evt);
    });
    this.aMc.on('press', (evt) => {
      this.handleButtonPress('a', evt);
    });
    this.bMc.on('press', (evt) => {
      this.handleButtonPress('b', evt);
    });
    this.yMc.on('press', (evt) => {
      this.handleButtonPress('y', evt);
    });
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
