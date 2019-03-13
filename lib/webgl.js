/**
 * WebGL sprite.js backend experiment
 *
 * Based on the work of Arno van der Vegt, 2011, legoasimo@gmail.com
 * http://www.playtankworld.com/demo/ortho
 *
 * Licence:  
 * Creative Commons Attribution/Share-Alike license
 * http://creativecommons.org/licenses/by-sa/3.0/
 *
 * The WebGL setup code was provided by: http://learningwebgl.com
**/
(function(global){

var mvMatrix      = mat4.create(),
    mvMatrixStack = [],
    pMatrix       = mat4.create();

function initGL(canvas) {
    try {
        var gl = canvas.getContext('webgl', {
  premultipliedAlpha: false  // Ask for non-premultiplied alpha
});
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    }
    catch (e) {
    }
    if (!gl) {
        alert('Could not initialise WebGL, sorry :-(');
    }
    return gl;
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var shader,
        str = '',
        k   = shaderScript.firstChild;

    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    if (shaderScript.type == 'x-shader/x-fragment') {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else if (shaderScript.type == 'x-shader/x-vertex') {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function initShaders(gl) {
    var fragmentShader = getShader(gl, 'shader-fs');
    var vertexShader = getShader(gl, 'shader-vs');

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Could not initialise shaders');
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.pMatrixUniform  = gl.getUniformLocation(shaderProgram, 'uPMatrix');
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix');
    shaderProgram.nMatrixUniform  = gl.getUniformLocation(shaderProgram, 'uNMatrix');
    shaderProgram.samplerUniform  = gl.getUniformLocation(shaderProgram, 'uSampler');
    shaderProgram.colorUniform  = gl.getUniformLocation(shaderProgram, 'uColor');
    shaderProgram.boundsUniform  = gl.getUniformLocation(shaderProgram, 'uBounds');
    
    gl.shaderProgram = shaderProgram;
}

function Texture(sprite) {
    this.gl = sprite.layer.ctx;
    var gl = this.gl;
    this.sprite = sprite;
    
    // init stuff
    this.createTexture(gl);
    this.createBuffers(gl);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(gl.shaderProgram.samplerUniform, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.glPositionBuffer);
    gl.vertexAttribPointer(gl.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.glTextureCoordBuffer);
    gl.vertexAttribPointer(gl.shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);    
 
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

Texture.prototype.ensureSize = function ensureSize() {
  /*
    var height = 1, width=1;
    // the img size should be a power of 2
    while (height < this.sprite.h) {
        height <<= 1;
    }
    while (width < this.sprite.w) {
        width <<= 1;
    }
    */

    var width = this.sprite.w;
    var height = this.sprite.h;

    // if the size is correct, and the image has the same size, no need to create a canvas
    //if(height == this.img.height && width == this.img.width)
    //    return this.img;
    // the image needs to be converted into a workable format
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    // copy the source texture to the canvas
    this.ctx.drawImage(this.sprite.img, this.sprite.xoffset, this.sprite.yoffset, 
        this.sprite.w, this.sprite.h, 0, 0, this.sprite.w, this.sprite.h);
    return this.canvas;
};

Texture.prototype.createTexture = function(gl) {
  var nearest = true;
    this.texture = gl.createTexture();
    var img = this.ensureSize();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  
    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (false && isPowerOf2(img.width) && isPowerOf2(img.height)) {
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
       //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nearest ? gl.NEAREST : gl.LINEAR);
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn off mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nearest ? gl.NEAREST : gl.LINEAR);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nearest ? gl.NEAREST : gl.LINEAR);
    }

    //gl.bindTexture(gl.TEXTURE_2D, null);        
};

Texture.prototype.createBuffers = function createBuffers(gl) {
    var vertices = [0.0,   0.0,    0.0,
                    this.canvas.width, 0.0,    0.0,
                    0.0,   this.canvas.height, 0.0,
                    this.canvas.width, this.canvas.height, 0.0];

    this.glPositionBuffer = gl.createBuffer();        
    this.gl.bindBuffer(gl.ARRAY_BUFFER, this.glPositionBuffer);        
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    this.glPositionBuffer.numItems = 4;

    var w             = 1,
        h             = 1,
        textureCoords = [0.0, 0.0,
                         w,   0.0,
                         0.0, h,
                         w,   h];
    
    this.glTextureCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(gl.ARRAY_BUFFER, this.glTextureCoordBuffer);
    this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
    this.glTextureCoordBuffer.numItems = 4;        
};

Texture.prototype.remove = function() {
    this.gl.deleteBuffer(this.glTextureCoordBuffer);
    this.gl.deleteTexture(this.texture);
    this.gl.deleteBuffer(this.glPositionBuffer);
    this.canvas = null;
}

let _parseColor = {};
function parseColor(col) {
  if (col === false) {
    return {r: 1.0, g: 1.0, b: 1.0}
  }
  if (col[0] === '#') col = col.substr(1);
  if (_parseColor.hasOwnProperty(col)) {
    return _parseColor[col];
  }
  return _parseColor[col] = (col.length <= 3) ? {
    r: (16*parseInt(col[0],16) + parseInt(col[0],16))/255,
    g: (16*parseInt(col[1],16) + parseInt(col[1],16))/255,
    b: (16*parseInt(col[2],16) + parseInt(col[2],16))/255,
  } : {
    r: (16*parseInt(col[0],16) + parseInt(col[1],16))/255,
    g: (16*parseInt(col[2],16) + parseInt(col[3],16))/255,
    b: (16*parseInt(col[4],16) + parseInt(col[5],16))/255,
  }
}

Texture.prototype.render = function render() {
    var gl = this.gl;    
    this.matrix();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);    
    
    // redraw the texture
    if(this.sprite._dirty["xoffset"] || this.sprite._dirty["yoffset"]) {
        this.ctx.clearRect(0, 0, this.sprite.w, this.sprite.h);
        this.ctx.drawImage(this.sprite.img, this.sprite.xoffset, this.sprite.yoffset, 
            this.sprite.w, this.sprite.h, 0, 0, this.sprite.w, this.sprite.h);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
    }
    
    //gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(gl.shaderProgram.samplerUniform, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.glPositionBuffer);
    gl.vertexAttribPointer(gl.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    //gl.bindBuffer(gl.ARRAY_BUFFER, this.glTextureCoordBuffer);
    //gl.vertexAttribPointer(gl.shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);       

  if (false) { // draw outline
    this.matrix( 0,-1);
    gl.uniform4f(gl.shaderProgram.colorUniform, 0, 0, 0, this.sprite.opacity);
    gl.uniform4f(gl.shaderProgram.boundsUniform, this.canvas.width, this.canvas.height,this.sprite.w, this.sprite.h);
    //gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.glPositionBuffer.numItems); 


    this.matrix( 1,0);
    gl.uniform4f(gl.shaderProgram.colorUniform, 0, 0, 0, this.sprite.opacity);
    gl.uniform4f(gl.shaderProgram.boundsUniform, this.canvas.width, this.canvas.height,this.sprite.w, this.sprite.h);
    //gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.glPositionBuffer.numItems); 

    this.matrix( 0, 1);
    gl.uniform4f(gl.shaderProgram.colorUniform, 0, 0, 0, this.sprite.opacity);
    gl.uniform4f(gl.shaderProgram.boundsUniform, this.canvas.width, this.canvas.height,this.sprite.w, this.sprite.h);
    //gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.glPositionBuffer.numItems); 

    this.matrix(-1, 0);
    gl.uniform4f(gl.shaderProgram.colorUniform, 0, 0, 0, this.sprite.opacity);
    gl.uniform4f(gl.shaderProgram.boundsUniform, this.canvas.width, this.canvas.height,this.sprite.w, this.sprite.h);
    //gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.glPositionBuffer.numItems); 
  }

    this.matrix(0,0);
    var col = parseColor(this.sprite.color || false);
    gl.uniform4f(gl.shaderProgram.colorUniform, col.r, col.g, col.b, this.sprite.opacity);
    gl.uniform4f(gl.shaderProgram.boundsUniform, this.canvas.width, this.canvas.height, this.sprite.w, this.sprite.h);
    //gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.glPositionBuffer.numItems); 
    
    this.sprite._dirty = {}
};


Texture.prototype.matrix = function matrix(offsetX=0.0, offsetY=0.0) {
  var gl = this.gl; 
  //pMatrix  = mat4.ortho(0, this.gl.viewportWidth, this.gl.viewportHeight, 0, 0.001, 100000);
  mvMatrix = mat4.identity(mat4.create());

  var px = this.sprite.x || 0.0;
  var py = this.sprite.y || 0.0;
  var sx = this.sprite.xscale || 1.0;
  var sy = this.sprite.yscale || 1.0;
  var fx = Math.sign(sx);
  var fy = Math.sign(sy);
  sx = Math.abs(sx);
  sy = Math.abs(sy);
  var tx = this.sprite.xTransformOrigin + offsetX;
  var ty = this.sprite.yTransformOrigin + offsetY;
  var rot = this.sprite.angle || 0.0;
  if (tx == null) tx = this.sprite.w >> 1;
  if (ty == null) ty = this.sprite.h >> 1;

  if ( false ) {
    mat4.translate(mvMatrix, [tx*sx, ty*sy, 0]);

    mat4.rotate(mvMatrix, rot, [0, 0, 1]);

    mat4.translate(mvMatrix, [px, py, 0]);

    mat4.scale(mvMatrix, [fx*sx, fy*sy, 1]);

    //mat4.scale(mvMatrix, [sx, sy, 1]);

    //mat4.translate(mvMatrix, [tx/sx, ty/sy, 0]);

  } else {
    mat4.translate(mvMatrix, [tx*sx, ty*sy, 0]);

    mat4.scale(mvMatrix, [fx*sx, fy*sy, 1]);

    //mat4.scale(mvMatrix, [sx, sy, 1]);

    //mat4.translate(mvMatrix, [tx/sx, ty/sy, 0]);

    mat4.translate(mvMatrix, [fx*px/sx, fy*py/sy, 0]);

    mat4.translate(mvMatrix, [fx*-tx, -ty, 0]);
    mat4.rotate(mvMatrix, rot, [0, 0, 1]);
    mat4.translate(mvMatrix, [fx*tx, ty, 0]);
  }

  /*
  mat4.translate(mvMatrix, [offsetX + this.sprite.x + 3*this.sprite.w / 2.0, 
      offsetY + this.sprite.y + 3*this.sprite.h / 2.0, 0]);

  if(this.sprite.angle != 0) {
      mat4.rotate(mvMatrix, this.sprite.angle, [0, 0, 1]);
  }

  var lx = 1.0;
  if(this.sprite.xscale != 0 || this.sprite.yscale != 0) {
    mat4.scale(mvMatrix, [this.sprite.xscale, this.sprite.yscale, 1]);
    lx = Math.sign(this.sprite.xscale)
  }

  mat4.scale(mvMatrix, [3, 3, 1]);
  mat4.translate(mvMatrix, [-this.sprite.w / 2.0, -this.sprite.h / 2.0, 0]);  
  */

  // send the stuff to the graphic card
  gl.uniformMatrix4fv(gl.shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(gl.shaderProgram.mvMatrixUniform, false, mvMatrix);
}

function init(canvas) {
    var gl = initGL(canvas);
    initShaders(gl);
    gl.clearColor(1.0, 1.0, 1.0, 0.0);
    gl.clearStencil(128);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA  );
    gl.enable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    
    pMatrix  = mat4.ortho(0, gl.viewportWidth, gl.viewportHeight, 0, 0.001, 100000);
    gl.uniformMatrix4fv(gl.shaderProgram.pMatrixUniform, false, pMatrix);
    mvMatrix = mat4.identity(mat4.create());
    
    return gl;
}

global.webgl = {
    init:init,
    Texture:Texture
}

})(this);
