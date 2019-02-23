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

function celesteInit() {
  celeste = (typeof celeste === "undefined") ? {} : celeste;
  load("./celeste/Graphics/sprites.json", (x) => {
    celeste.sprites = JSON.parse(x);
    celeste.player = celeste.player || {};
    celeste.player = Object.assign(celeste.player, Object.assign.apply(null, celeste.sprites.Sprites.player.Loop.map((v, i) => { return {[v._attributes.id]: Object.assign({type: "Loop"}, v._attributes)} })));
    celeste.player = Object.assign(celeste.player, Object.assign.apply(null, celeste.sprites.Sprites.player.Anim.map((v, i) => { return {[v._attributes.id]: Object.assign({type: "Anim"}, v._attributes)} })));
  });
}

