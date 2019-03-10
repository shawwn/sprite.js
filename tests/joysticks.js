window.addEventListener('load', () => {
  let left;
  let right;

  const maxJoystickSize = 180;

  const dimensions = () => {
    const w = window.innerWidth;
    return {
      width: w,
      height: Math.round(w * 0.44),
      joystickSize: Math.round(w * 0.3),
    };
  };

  function createJoysticks(leftId, rightId) {
    const d = dimensions();
    const size = Math.min(d.joystickSize, maxJoystickSize);

    left = nipplejs.create({
      zone: document.getElementById(leftId),
      mode: 'static',
      position: { left: '41%', top: '52%' },
      color: 'white',
      size,
    });

    right = nipplejs.create({
      zone: document.getElementById(rightId),
      mode: 'static',
      position: { right: '41%', top: '52%' },
      color: 'white',
      size,
    });
  }

  function handleLeftMove(evt, data) {
    console.log(data);
  }

  function handleRightStart(evt, data) {
    console.log(data);
  }

  function handleRightEnd(evt, data) {
    console.log(data);
  }

  function handleRightMove(evt, data) {
    console.log(data);
  }

  function addMoveListeners() {
    left.on('0:move', handleLeftMove);
    right.on('move', handleRightMove);
    right.on('start', handleRightStart);
    right.on('end', handleRightEnd);
  }

  createJoysticks('left', 'right');
  addMoveListeners();
});
