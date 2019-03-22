function load(src, callback) {
  var xobj = new XMLHttpRequest();
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4) {
      var text = xobj.responseText;
      callback(text);
    }
  }
  src = src + "?t=" + (new Date()).getTime();
  xobj.open('GET', src, true);
  xobj.send(null);
}

class CelesteFrame {
  constructor(path, i) {
    let o = (i >= 0 && i <= 9) ? "0" : "";
    this.i = i;
    this.path = `${path}${o}${i}.png`;
    this.meta = `${path}${o}${i}.meta.yaml`;
    this.sprite = null;
  }

  load(scene, layer, cb) {
    //console.log(this.path,from,upto, x, this.path, frame.meta);
    load(this.meta, (x) => {
      let props = this.props = eval(`var zz={${x.replace(/\n/g, ",")}}; zz;`); // TODO
      let sprite = this.sprite = scene.Sprite(this.path, layer);
      cb(this);
    });
  }
  get iw() { return (this.sprite && this.sprite.img) ? this.sprite.img.width : 0; }
  get ih() { return (this.sprite && this.sprite.img) ? this.sprite.img.height : 0; }
  get w() { return this.props.Width; }
  get h() { return this.props.Height; }
  get x() { return this.props.X; }
  get y() { return this.props.Y; }
};

function tryParseInt(x) {
  if (typeof x === "number") return x;
  let i = parseInt(x);
  if (!isNaN(i)) return i;
}

class CelesteFrames {
  constructor(scene, layer, path, spec) {
    this.framesets = [];
    for (let x of spec.split(",")) {
      let [from, upto=from] = x.split("-").map(tryParseInt);
      let frames = [];
      for (let i = from; i <= upto; i++) {
        let frame = new CelesteFrame('./celeste/Graphics/Atlases/Gameplay/characters/player/' + path, i);
        frame.load(scene, layer, (frame) => {
          console.dir(frame);
          frames[frame.i-from] = frame;
        });
      }
      this.framesets.push(frames);
    }
  }
};

function celesteInit(scene, layer, callback) {
  celeste = (typeof celeste === "undefined") ? {} : celeste;
  load("./celeste/Graphics/Sprites.json", (x) => {
    celeste.sprites = JSON.parse(x);
    celeste.player = celeste.player || {};
    celeste.player = Object.assign(celeste.player, Object.assign.apply(null, celeste.sprites.Sprites.player.Loop.map((v, i) => { return {[v._attributes.id]: Object.assign({type: "Loop"}, v._attributes)} })));
    celeste.player = Object.assign(celeste.player, Object.assign.apply(null, celeste.sprites.Sprites.player.Anim.map((v, i) => { return {[v._attributes.id]: Object.assign({type: "Anim"}, v._attributes)} })));
    celeste.anims = celeste.anims || {};
    for (let name of ["walk", "dash", "climbup", "idle", "idleA", "idleB", "idleC", "runFast", "runSlow", "runStumble", "runWind", "jumpFast", "jumpSlow", "fallFast", "fallSlow"]) {
      celeste.anims[name] = new CelesteFrames(scene, layer, celeste.player[name].path, celeste.player[name].frames);
    }
    callback();
  });
}

