const Hammer = window.Hammer || {};

// time in ms, duration cutoff for tap and min duration for press
const tapPressThreshold = 100;

const directions = {
  ALL: 'ALL',
  VERT: 'VERT',
  D: 'DOWN',
  U: 'U',
  HOR: 'HOR',
  R: 'R',
  L: 'L',
  NONE: 'NONE',
};

const evtStates = {
  START: 1,
  MOVE: 2,
  END: 4,
  CANCEL: 8,
};

const gestures = {
  PAN: 'pan',
  TAP: 'tap',
  PRESS: 'press',
  PRESS_UP: 'pressup',
};

class TouchController {
  constructor(padId, xId, aId, bId, yId) {
    this.pad = document.getElementById(padId);
    this.x = document.getElementById(xId);
    this.a = document.getElementById(aId);
    this.b = document.getElementById(bId);
    this.y = document.getElementById(yId);
    this.bindEvents();
    this.attachPadGestures();
    this.attachButtonGestures();
    this.listenForButtonTaps();
    this.listenForButtonPresses();
    this.listenForPadEvents();
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

  handleUnknownEvent(evt) {
    console.log('unknown', evt);
  }

  handlePadPan(evt) {
    const {direction} = evt;

    switch (direction) {
      case Hammer.DIRECTION_UP:
        return this.handlePadPanUp(evt);

      case Hammer.DIRECTION_DOWN:
        return this.handlePadPanDown(evt);

      case Hammer.DIRECTION_LEFT:
        return this.handlePadPanLeft(evt);

      case Hammer.DIRECTION_RIGHT:
        return this.handlePadPanRight(evt);

      default:
        return this.handleUnknownEvent(evt);
    }
  }

  handlePadPressUp(evt) {
    console.log('pad press up', evt);
  }

  handlePadPress(evt) {
    console.log('press', evt);
  }

  handlePadTap(evt) {
    console.log('tap', evt);
  }

  handleButtonTap(button, direction, evt) {
    console.log(button, 'tap', evt);
  }

  handleButtonPress(button, direction, evt) {
    const { type } = evt;
    console.log(button, type, direction, evt);
  }

  attachPadGestures() {
    this.padMc = new Hammer.Manager(this.pad);
    this.padMc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
    this.padMc.add(new Hammer.Press({ time: tapPressThreshold }));
    this.padMc.add(new Hammer.Tap({ time: tapPressThreshold }));
  }

  attachButtonGestures() {
    this.xMc = new Hammer.Manager(this.x);
    this.aMc = new Hammer.Manager(this.a);
    this.bMc = new Hammer.Manager(this.b);
    this.yMc = new Hammer.Manager(this.y);
    this.xMc.add(new Hammer.Tap({ time: tapPressThreshold }));
    this.xMc.add(new Hammer.Press({ time: tapPressThreshold }));
    this.aMc.add(new Hammer.Tap({ time: tapPressThreshold }));
    this.aMc.add(new Hammer.Press({ time: tapPressThreshold }));
    this.bMc.add(new Hammer.Tap({ time: tapPressThreshold }));
    this.bMc.add(new Hammer.Press({ time: tapPressThreshold }));
    this.yMc.add(new Hammer.Tap({ time: tapPressThreshold }));
    this.yMc.add(new Hammer.Press({ time: tapPressThreshold }));
  }

  listenForPadEvents() {
    this.padMc.on(gestures.PAN, this.handlePadPan);
    this.padMc.on(gestures.PRESS, this.handlePadPress);
    this.padMc.on(gestures.PRESS_UP, this.handlePadPressUp);
    this.padMc.on(gestures.TAP, this.handlePadTap);
  }

  listenForButtonTaps() {
    this.xMc.on(gestures.TAP, (evt) => {
      this.handleButtonTap('x', directions.NONE, evt);
    });
    this.aMc.on(gestures.TAP, (evt) => {
      this.handleButtonTap('a', directions.NONE, evt);
    });
    this.bMc.on(gestures.TAP, (evt) => {
      this.handleButtonTap('b', directions.NONE, evt);
    });
    this.yMc.on(gestures.TAP, (evt) => {
      this.handleButtonTap('y', directions.NONE, evt);
    });
  }

  listenForButtonPresses() {
    this.xMc.on(gestures.PRESS, (evt) => {
      this.handleButtonPress('x', directions.D, evt);
    });
    this.xMc.on(gestures.PRESS_UP, (evt) => {
      this.handleButtonPress('x', directions.U, evt);
    });
    this.aMc.on(gestures.PRESS, (evt) => {
      this.handleButtonPress('a', directions.D, evt);
    });
    this.aMc.on(gestures.PRESS_UP, (evt) => {
      this.handleButtonPress('a', directions.U, evt);
    });
    this.bMc.on(gestures.PRESS, (evt) => {
      this.handleButtonPress('b', directions.D, evt);
    });
    this.bMc.on(gestures.PRESS_UP, (evt) => {
      this.handleButtonPress('b', directions.U, evt);
    });
    this.yMc.on(gestures.PRESS, (evt) => {
      this.handleButtonPress('y', directions.D, evt);
    });
    this.yMc.on(gestures.PRESS_UP, (evt) => {
      this.handleButtonPress('y', directions.U, evt);
    });
  }
}

function initTouchController() {
  return new TouchController('controller-pad', 'x', 'a', 'b', 'y');
}

let touchController;

window.addEventListener('load', () => {
  touchController = initTouchController();
  console.log(touchController);
});
