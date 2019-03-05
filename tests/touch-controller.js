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
  constructor(padConfig = {}, buttonConfigs = []) {
    this.buttons = {};

    this.current = {
      pressingButtons: [],
      pressingPad: false,
      panDirection: directions.NONE,
    };

    this.pad = {
      element: document.getElementById(padConfig.id),
      manager: null,
      name: padConfig.name,
      data: padConfig.data,
    };

    buttonConfigs.map((config) => {
      this.buttons[config.id] = {
        element: document.getElementById(config.id),
        manager: null,
        name: config.name,
        data: config.data,
      };
    });

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

  handlePadPanLeft(pad, evt) {
    console.log(pad, gestures.PAN, directions.L, evt);
  }

  handlePadPanRight(pad, evt) {
    console.log('pan right', evt);
  }

  handlePadPanUp(pad, evt) {
    console.log('pan up', evt);
  }

  handlePadPanDown(pad, evt) {
    console.log('pan down', evt);
  }

  handleUnknownEvent(evt) {
    console.log('unknown', evt);
  }

  handlePadPan(evt) {
    const {direction} = evt;

    switch (direction) {
      case Hammer.DIRECTION_UP:
        return this.handlePadPanUp(this.pad, evt);

      case Hammer.DIRECTION_DOWN:
        return this.handlePadPanDown(this.pad, evt);

      case Hammer.DIRECTION_LEFT:
        return this.handlePadPanLeft(this.pad, evt);

      case Hammer.DIRECTION_RIGHT:
        return this.handlePadPanRight(this.pad, evt);

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

  attachPadGestures() {
    this.pad.manager = new Hammer.Manager(this.pad.element);
    this.pad.manager.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
    this.pad.manager.add(new Hammer.Press({ time: tapPressThreshold }));
    this.pad.manager.add(new Hammer.Tap({ time: tapPressThreshold }));
  }

  handleButtonTap(button, direction, evt) {
    console.log(button, 'tap', evt);
  }

  handleButtonPress(button, direction, evt) {
    const { type } = evt;
    console.log(button, type, direction, evt);
  }

  attachButtonGestures() {
    this.buttonIds.forEach((id) => {
      this.buttons[id].manager = new Hammer.Manager(this.buttons[id].element);
      this.buttons[id].manager.add(new Hammer.Tap({ time: tapPressThreshold }));
      this.buttons[id].manager.add(new Hammer.Press({ time: tapPressThreshold }));
    });
  }

  listenForPadEvents() {
    this.pad.manager.on(gestures.PAN, this.handlePadPan);
    this.pad.manager.on(gestures.PRESS, this.handlePadPress);
    this.pad.manager.on(gestures.PRESS_UP, this.handlePadPressUp);
    this.pad.manager.on(gestures.TAP, this.handlePadTap);
  }

  listenForButtonTaps() {
    this.buttonIds.forEach((id) => {
      this.buttons[id].manager.on(gestures.TAP, (evt) => {
        this.handleButtonTap(this.buttons[id], directions.NONE, evt);
      });
    });
  }

  listenForButtonPresses() {
    this.buttonIds.forEach((id) => {
      this.buttons[id].manager.on(gestures.PRESS, (evt) => {
        this.handleButtonPress(this.buttons[id], directions.D, evt);
      });
      this.buttons[id].manager.on(gestures.PRESS_UP, (evt) => {
        this.handleButtonPress(this.buttons[id], directions.U, evt);
      });
    });
  }

  get buttonIds() {
    return Object.keys(this.buttons);
  }
}

function initTouchController() {
  const padConfig = {
    id: 'controller-pad',
    name: 'controller-pad',
  };

  const buttonConfigs = [
    { name: 'x', id: 'x' },
    { name: 'a', id: 'a' },
    { name: 'b', id: 'b' },
    { name: 'y', id: 'y' },
  ];

  return new TouchController(padConfig, buttonConfigs);
}

let touchController;

window.addEventListener('load', () => {
  touchController = initTouchController();
  console.log(touchController);
});
