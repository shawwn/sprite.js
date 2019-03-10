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
      position: { left: '50%', top: '50%' },
      color: 'green',
      size,
    });

    right = nipplejs.create({
      zone: document.getElementById(rightId),
      mode: 'static',
      position: { right: '50%', top: '50%' },
      color: 'red',
      size,
    });
  }

  function handleLeftMove(evt, data) {
    console.log(data);
  }

  function handleRightMove(evt, data) {
    console.log(data);
  }

  function addMoveListeners() {
    left.on('0:move', handleLeftMove);
    right.on('1:move', handleRightMove);
  }

  createJoysticks('left', 'right');
  addMoveListeners();
});
