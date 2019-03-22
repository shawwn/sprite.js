/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * Low level shader typed array related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibily they are available at both `twgl.typedArray` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/typedArray
 */

// make sure we don't see a global gl
//const gl = undefined;  // eslint-disable-line

/* DataType */
const BYTE                           = 0x1400;
const UNSIGNED_BYTE                  = 0x1401;
const SHORT                          = 0x1402;
const UNSIGNED_SHORT                 = 0x1403;
const INT                            = 0x1404;
const UNSIGNED_INT                   = 0x1405;
const FLOAT                          = 0x1406;
const UNSIGNED_SHORT_4_4_4_4       = 0x8033;
const UNSIGNED_SHORT_5_5_5_1       = 0x8034;
const UNSIGNED_SHORT_5_6_5         = 0x8363;
const HALF_FLOAT                   = 0x140B;
const UNSIGNED_INT_2_10_10_10_REV  = 0x8368;
const UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B;
const UNSIGNED_INT_5_9_9_9_REV     = 0x8C3E;
const FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD;
const UNSIGNED_INT_24_8            = 0x84FA;

const glTypeToTypedArray = {};
{
  const tt = glTypeToTypedArray;
  tt[BYTE]                           = Int8Array;
  tt[UNSIGNED_BYTE]                  = Uint8Array;
  tt[SHORT]                          = Int16Array;
  tt[UNSIGNED_SHORT]                 = Uint16Array;
  tt[INT]                            = Int32Array;
  tt[UNSIGNED_INT]                   = Uint32Array;
  tt[FLOAT]                          = Float32Array;
  tt[UNSIGNED_SHORT_4_4_4_4]         = Uint16Array;
  tt[UNSIGNED_SHORT_5_5_5_1]         = Uint16Array;
  tt[UNSIGNED_SHORT_5_6_5]           = Uint16Array;
  tt[HALF_FLOAT]                     = Uint16Array;
  tt[UNSIGNED_INT_2_10_10_10_REV]    = Uint32Array;
  tt[UNSIGNED_INT_10F_11F_11F_REV]   = Uint32Array;
  tt[UNSIGNED_INT_5_9_9_9_REV]       = Uint32Array;
  tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
  tt[UNSIGNED_INT_24_8]              = Uint32Array;
}

/**
 * Get the GL type for a typedArray
 * @param {ArrayBufferView} typedArray a typedArray
 * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */
function getGLTypeForTypedArray(typedArray) {
  if (typedArray instanceof Int8Array)         { return BYTE; }           // eslint-disable-line
  if (typedArray instanceof Uint8Array)        { return UNSIGNED_BYTE; }  // eslint-disable-line
  if (typedArray instanceof Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
  if (typedArray instanceof Int16Array)        { return SHORT; }          // eslint-disable-line
  if (typedArray instanceof Uint16Array)       { return UNSIGNED_SHORT; } // eslint-disable-line
  if (typedArray instanceof Int32Array)        { return INT; }            // eslint-disable-line
  if (typedArray instanceof Uint32Array)       { return UNSIGNED_INT; }   // eslint-disable-line
  if (typedArray instanceof Float32Array)      { return FLOAT; }          // eslint-disable-line
  throw "unsupported typed array type";
}

/**
 * Get the GL type for a typedArray type
 * @param {ArrayBufferView} typedArrayType a typedArray constructor
 * @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */
function getGLTypeForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array)         { return BYTE; }           // eslint-disable-line
  if (typedArrayType === Uint8Array)        { return UNSIGNED_BYTE; }  // eslint-disable-line
  if (typedArrayType === Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
  if (typedArrayType === Int16Array)        { return SHORT; }          // eslint-disable-line
  if (typedArrayType === Uint16Array)       { return UNSIGNED_SHORT; } // eslint-disable-line
  if (typedArrayType === Int32Array)        { return INT; }            // eslint-disable-line
  if (typedArrayType === Uint32Array)       { return UNSIGNED_INT; }   // eslint-disable-line
  if (typedArrayType === Float32Array)      { return FLOAT; }          // eslint-disable-line
  throw "unsupported typed array type";
}

/**
 * Get the typed array constructor for a given GL type
 * @param {number} type the GL type. (eg: `gl.UNSIGNED_INT`)
 * @return {function} the constructor for a the corresponding typed array. (eg. `Uint32Array`).
 * @memberOf module:twgl/typedArray
 */
function getTypedArrayTypeForGLType(type) {
  const CTOR = glTypeToTypedArray[type];
  if (!CTOR) {
    throw "unknown gl type";
  }
  return CTOR;
}

const isArrayBuffer = typeof SharedArrayBuffer !== 'undefined'
  ? function isArrayBufferOrSharedArrayBuffer(a) {
    return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
  }
  : function isArrayBuffer(a) {
    return a && a.buffer && a.buffer instanceof ArrayBuffer;
  };

typedArrays = window.typedArrays = {
  getGLTypeForTypedArray,
  getGLTypeForTypedArrayType,
  getTypedArrayTypeForGLType,
  isArrayBuffer,
};



/**
 * Add `push` to a typed array. It just keeps a 'cursor'
 * and allows use to `push` values into the array so we
 * don't have to manually compute offsets
 * @param {TypedArray} typedArray TypedArray to augment
 * @param {number} numComponents number of components.
 * @private
 */

function augmentTypedArray(typedArray, numComponents) {
  var cursor = 0;

  typedArray.push = function () {
    for (var ii = 0; ii < arguments.length; ++ii) {
      var value = arguments[ii];

      if (value instanceof Array || typedArrays.isArrayBuffer(value)) {
        for (var jj = 0; jj < value.length; ++jj) {
          typedArray[cursor++] = value[jj];
        }
      } else {
        typedArray[cursor++] = value;
      }
    }
  };

  typedArray.reset = function (opt_index) {
    cursor = opt_index || 0;
  };

  typedArray.numComponents = numComponents;
  Object.defineProperty(typedArray, 'numElements', {
    get: function get() {
      return this.length / this.numComponents | 0;
    }
  });
  return typedArray;
}
/**
 * creates a typed array with a `push` function attached
 * so that you can easily *push* values.
 *
 * `push` can take multiple arguments. If an argument is an array each element
 * of the array will be added to the typed array.
 *
 * Example:
 *
 *     const array = createAugmentedTypedArray(3, 2);  // creates a Float32Array with 6 values
 *     array.push(1, 2, 3);
 *     array.push([4, 5, 6]);
 *     // array now contains [1, 2, 3, 4, 5, 6]
 *
 * Also has `numComponents` and `numElements` properties.
 *
 * @param {number} numComponents number of components
 * @param {number} numElements number of elements. The total size of the array will be `numComponents * numElements`.
 * @param {constructor} opt_type A constructor for the type. Default = `Float32Array`.
 * @return {ArrayBufferView} A typed array.
 * @memberOf module:twgl/primitives
 */


function createAugmentedTypedArray(numComponents, numElements, opt_type) {
  var Type = opt_type || Float32Array;
  return augmentTypedArray(new Type(numComponents * numElements), numComponents);
}


CCeleste = class CCeleste extends CEngine {
  constructor() {
    super();
  }
};


CCutsceneEntity = class CCutsceneEntity extends CEntity {
  /*public*/ /*CutsceneEntity*/ constructor(/*bool*/ fadeInOnSkip = true, /*bool*/ endingChapterAfter = false)
  {
    super();
    this.RemoveOnSkipped = true;
    this.WasSkipped = false;
    this.Running = false;

    this.FadeInOnSkip = fadeInOnSkip;
    this.EndingChapterAfter = endingChapterAfter;
    this.Level = null;
  }

  /*public*/ /*override*/ /*void*/ Added(/*Scene*/ scene)
  {
    super.Added(scene);
    this.Level = scene /*as*/ /*Level*/;
    this.Start();
  }

  /*public*/ /*void*/ Start()
  {
    this.Running = true;
    this.Level.StartCutscene(new Action<Level>(this.SkipCutscene), this.FadeInOnSkip, this.EndingChapterAfter);
    this.OnBegin(this.Level);
  }

  /*public*/ /*override*/ /*void*/ Update()
  {
    if (this.Level.RetryPlayerCorpse != null)
      this.Active = false;
    else
      super.Update();
  }

  /*private*/ /*void*/ SkipCutscene(/*Level*/ level)
  {
    this.WasSkipped = true;
    this.EndCutscene(level, this.RemoveOnSkipped);
  }

  /*public*/ /*void*/ EndCutscene(/*Level*/ level, /*bool*/ removeSelf = true)
  {
    this.Running = false;
    this.OnEnd(level);
    level.EndCutscene();
    if (!removeSelf)
      return;
    this.RemoveSelf();
  }

  /*public*/ /*abstract*/ /*void*/ OnBegin(/*Level*/ level)
  {
    throw new CNotImplementedException();
  }

  /*public*/ /*abstract*/ /*void*/ OnEnd(/*Level*/ level)
  {
    throw new CNotImplementedException();
  }

  /*public*/ static /*IEnumerator*/ *CameraTo(
    /*Vector2*/ target,
    /*float*/ duration,
    /*CEase.Easer*/ ease = null,
    /*float*/ delay = 0.0)
  {
    if (ease == null)
      ease = CEase.CubeInOut;
    if (/*(double)*/ delay > 0.0)
      yield delay;
    /*Level*/ let level = CEngine.Scene /*as*/ /*Level*/;
    /*Vector2*/ let from = level.Camera.Position;
    for (/*float*/ let p = 0.0; /*(double)*/ p < 1.0; p += CEngine.DeltaTime / duration)
    {
      level.Camera.Position = CCalc.Lerp(from, target, ease(p)); //from["+"](target["-"](from))["*"](ease(p));
      yield null;
    }
  }
}

