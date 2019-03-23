function either(x, ...ys)
{
  return (ys.length <= 0) ? x : (x != null) ? x : either(...ys);
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _extendClass(...args) {
  return _createClass(...args);
}

function FIsIterable(x) {
  try
  {
    return x[Symbol.iterator] != null;
  }
  catch (e)
  {
    return false;
  }
}

function FIsList(x) {
  return FIsIterable(x) && typeof x === 'object'
}

function FListify(x) {
  return FIsList(x) ? x : [x];
}

CAssembly = class CAssembly {
  constructor()
  {
    this.INTERNAL_types = Object.create(null);
  }

  get Types()
  {
    return this.GetTypes();
  }

  GetTypes()
  {
    return this.INTERNAL_types;
  }

  GetType(name)
  {
    for (let typeName of FListify(name)) {
      let type = this.INTERNAL_types[name];
      if (type != null)
        return type;
    }
  }

  SetType(name, type)
  {
    for (let typeName of FListify(name)) {
      this.INTERNAL_types[typeName] = type;
    }
    return type;
  }
};
DotNet = new CAssembly();

CMath = class CMath {
  static get PI() { return Math.PI; }
  static Abs(x) { return Math.abs(x); }
  static Sin(x) { return Math.sin(x); }
  static Cos(x) { return Math.cos(x); }
  static Tan(x) { return Math.tan(x); }
  static Asin(x) { return Math.asin(x); }
  static Acos(x) { return Math.acos(x); }
  static Atan(x) { return Math.atan(x); }
  static Sqrt(x) { return Math.sqrt(x); }
  static Sign(x) { return Math.sign(x); }
  static Floor(x) { return Math.floor(x); }
  static Round(x) { return Math.round(x); }
  static Min(x, y) { return Math.min(x, y); }
  static Max(x, y) { return Math.max(x, y); }
  static Clamp(a, b, t) { return Math.max(a, Math.min(b, t)); }
  static Pow(x,y) { return Math.pow(x,y); }
};


function _int(x) {
  return x | 0;
}

function FisNumber(x) {
  return typeof x === "number";
}

function FisFunction(x) {
  return typeof x === "number";
}

function FisGenerator(x) {
    return x.constructor.name === 'GeneratorFunction';
}

function FisEnumerator(x) {
  if (x == null) return false;
  if (FisGenerator(x)) return true;
  return false;
}

function FasEnumerable(x) {
  return new CEnumerable(x);
}

function FasEnumerator(x) {
  return FasEnumerable(x).GetEnumerator();
}

function Fnewchar(n) {
  return new Array(n);
}

function Fnewstring(chArray) {
  return chArray.join('');
}

function Fnull(x) {
  return x == null;
}

function FLength(x) {
  return x.length;
}

function Fnameof(x, name) {
  return name;
}

function FcharToInt(x) {
  return x.charCodeAt(0);
}

function FSubstring(str, from = 0, upto = FLength(str)) {
  return str.substr(from, upto);
}

function FTrim(str) {
  return str.trim();
}

function FIndexOfAny(str, array) {
  for (let x of array) {
    var idx = str.indexOf(x);
    if (idx > 0) {
      return idx;
    }
  }
  return -1;
}

function FLastIndexOf(str, c) {
  return str.lastIndexOf(c);
}

function FLastIndexOfAny(str, array) {
  var idx = -1;
  for (let x of array) {
    var idx2 = str.indexOf(x);
    if (idx2 > idx) {
      idx = idx2;
    }
  }
  return idx;
}

Cstring = class Cstring {
  static get Empty() {
    return '';
  }

  static IsNullOrEmpty(value) {
    if (value != null)
      return FLength(value) === 0;
    return true;
  }
};

CNotImplementedException = class CNotImplementedException extends Error {
}

CInvalidOperationException = class CInvalidOperationException extends Error {
}

CArgumentException = class CArgumentException extends Error {
}

CArgumentOutOfRangeException = class CArgumentOutOfRangeException extends Error {
}

CArgumentNullException = class CArgumentNullException extends Error {
}

/**
 * mersenne-twister.js
 * (c) 2013 Ben Lesh
 * http://www.benlesh.com
 * MIT License
 * 
 * generates uniformly distributed positive integers between 0 and 0x100000000 
 * with the MT19937 algorithm. 19937 is the size of the state in bits.
 * 
 * More information about Mersenne Twister can be found on wikipedia
 * http://en.wikipedia.org/wiki/Mersenne_twister
 */

CMersenneTwister = class CMersenneTwister {
  constructor(seed)
  {
    if (seed == null)
      seed = CEnvironment.RandomUint32();
    this.mt = [CMath.Abs(seed)];
    this.mtLen = 624;
    this.last32 = 18122433253 & 0xFFFFFFFF;
    this.index = 0;

    for (let i = 1; i < this.mtLen; i++) {
        this.mt[i] = this.last32 * ((this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)) >>> 0) + 1;
    }
  }

  NextUint32() {
    if (this.index === 0) {
      this._Generate();
    }

    let y = this.mt[this.index];
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;
    y >>>= 0; 

    this.index = (this.index + 1) % this.mtLen;
    return y;
  }

  Next(maxValue) {
    if (maxValue != null) {
      return CMath.Floor(this.NextFloat() * maxValue);
    } else {
      return this.NextUint32();
    }
  }

  NextFloat() {
    return this.NextUint32() / 0x100000000;
  }

  _Generate() {
      let i, y;
      for (i = 0; i < this.mtLen; i++) {
          y = ((this.mt[i] & 0x80000000) + (this.mt[(i + 1) % this.mtLen] & 0x7fffffff)) >>> 0;
          this.mt[i] = (this.mt[(i + 397) % this.mtLen] ^ (y >>> 1)) >>> 0;
          if (y % 2 !== 0) {
              this.mt[i] = (this.mt[i] ^ 0x9908b0df) >>> 0;
          }
      }
  }
};

CRandom = DotNet.SetType("System.Runtime.InteropServices.Random",
class CRandom extends CMersenneTwister {
});

DotNet.SetType("CEnvironment.Random", CRandom);

CEnvironment = class CEnvironment {
  static get IsRunningOnWindows() {
    return false;
  }

  static GetEnvironmentVariable(name) {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(name);
    } else {
      throw new CNotImplementedException("CEnvironment::GetEnvironmentVariable");
    }
  }

  static get RandomType()
  {
    return DotNet.GetType("CEnvironment.Random") || DotNet.SetType("CEnvironment.Random", CRandom);
  }

  static set RandomType(value)
  {
    DotNet.SetType("CEnvironment.Random", value);
  }

  static get Random()
  {
    if (CEnvironment.INTERNAL_Random == null)
      CEnvironment.INTERNAL_Random = new CEnvironment.RandomType();
    return CEnvironment.INTERNAL_Random;
  }

  static set Random(value)
  {
    CEnvironment.INTERNAL_Random = value;
    return value;
  }

  static get RandomStack()
  {
    if (CEnvironment.INTERNAL_RandomStack == null)
      CEnvironment.INTERNAL_RandomStack = new CStack();
    return CEnvironment.INTERNAL_RandomStack;
  }

  static PushRandom(newSeed)
  {
    if (newSeed == null)
      newSeed = new CRandom();
    CEnvironment.RandomStack.Push(CEnvironment.Random);
    CEnvironment.Random = (newSeed instanceof CRandom) ? newSeed : new CRandom(newSeed);
  }

  static PopRandom()
  {
    CEnvironment.Random = CEnvironment.RandomStack.Pop();
  }

  static RandomUint32() {
    let array = CEnvironment.INTERNAL_RandomUint32 || (CEnvironment.INTERNAL_RandomUint32 = new Uint32Array(1));
    crypto.getRandomValues(array);
    return array[0];
  }
};


CThread = class CThread {
  static async Sleep(ms) {
    let accept, reject;
    var p = new Promise((accept_, reject_) => { accept = accept_; reject = reject_; });
    setTimeout(() => {
      accept();
    }, ms);
    return p;
  }
};


Clong = class Clong {
  static get MaxValue() { return BigInt(Number.MAX_SAFE_INTEGER); }
  static get MinValue() { return -BigInt(Number.MAX_SAFE_INTEGER); }
  static FromNumber(x) {
    return BigInt(CMath.Floor(x));
  }
};

Cdouble = class Cdouble {
  static IsNaN(value) {
    return isNaN(value);
  }
}

CEnumerator = class CEnumerator {
  constructor(value) {
    this._value = value;
    this._started = false;
  }
  get Current()
  {
    if (!this._started)
      throw new CInvalidOperationException("Must call MoveNext() before .Current");
    if (this._current.done)
      return undefined;
    return this._current.value;
  }
  MoveNext()
  {
    this._current = this._value.next();
    this._started = true;
    return !this._current.done;
  }
  Reset()
  {
    throw new CNotImplementedException();
  }
};

CEnumerable = class CEnumerable {
  constructor(value)
  {
    this._value = value;
  }

  GetEnumerator()
  {
    if (this._value instanceof CEnumerable)
      return this._value.GetEnumerator();
    if (FisGenerator(this._value))
      return new CEnumerator(this._value());
    if (FisFunction(this._value))
      return new CEnumerator(this._value());
    if (this._value[Symbol.iterator])
      return new CEnumerator(this._value[Symbol.iterator]());
    throw new CArgumentException("Not enumerable.")
  }
};

CList = class CList extends CEnumerable {
  constructor(from)
  {
    super(from ? [...from] : []);
  }

  [Symbol.iterator]()
  {
    return this.Iterator;
  }

  get Iterator()
  {
    return this._value.values();
  }

  At(i)
  {
    return this._value[i];
  }

  Set(index, value)
  {
    return (this._value[index] = value);
  }

  get Count()
  {
    return FLength(this._value);
  }

  Clear()
  {
    while (this.Count > 0)
      this._Pop();
  }

  Contains(item)
  {
    return this._value.indexOf(item) >= 0;
  }

  _Pop()
  {
    if (this.Count == 0)
      this._ThrowForEmptyList();
    return this._value.pop();
  }

  Add(item)
  {
    this._value.push(item);
  }

  AddRange(items)
  {
    for (let item of items)
      this.Add(item);
  }

  Remove(item)
  {
    let idx = this._value.indexOf(item);
    if (idx >= 0)
    {
      return this._value.splice(idx, 1);
    }
  }

  Sort(compareFn)
  {
    this._value.sort(compareFn);
  }

  Shuffle(random)
  {
    random = random || CEnvironment.Random;
    /*int*/ let count = this.Count;
    while (--count > 0)
    {
      /*T*/ let obj = this.At(count);
      /*int*/ let index;
      this.Set(count, this.At(index = random.Next(count + 1)));
      this.Set(index, obj);
    }
    return this;
  }

  ToArray()
  {
    return [...this._value];
  }

  _ThrowForEmptyList()
  {
    throw new CInvalidOperationException("List empty.");
  }
};

CStack = class CStack extends CEnumerable {
  constructor()
  {
    super([]);
  }

  get Count()
  {
    return FLength(this._value);
  }

  Clear()
  {
    while (this.Count > 0)
      this.Pop();
  }

  Contains(item)
  {
    return this._value.indexOf(item) >= 0;
  }

  Peek()
  {
    if (this.Count == 0)
      this._ThrowForEmptyStack();
    return this._value[this.Count - 1];
  }

  Pop()
  {
    if (this.Count == 0)
      this._ThrowForEmptyStack();
    return this._value.pop();
  }

  Push(item)
  {
    this._value.push(item);
  }

  ToArray()
  {
    return [...this._value];
  }

  _ThrowForEmptyStack()
  {
    throw new CInvalidOperationException("Stack empty.");
  }
};

CTimeSpan = class CTimeSpan {
  /*public*/ /*const*/ /*long*/ static get TicksPerMillisecond() { return 10000n; }
  /*private*/ /*const*/ /*double*/ static get MillisecondsPerTick() { return 0.0001; }
  /*public*/ /*const*/ /*long*/ static get TicksPerSecond() { return 10000000n; }
  /*private*/ /*const*/ /*double*/ static get SecondsPerTick() { return 1E-07; }
  /*public*/ /*const*/ /*long*/ static get TicksPerMinute() { return 600000000n; }
  /*private*/ /*const*/ /*double*/ static get MinutesPerTick() { return 1.66666666666667E-09; }
  /*public*/ /*const*/ /*long*/ static get TicksPerHour() { return 36000000000n; }
  /*private*/ /*const*/ /*double*/ static get HoursPerTick() { return 2.77777777777778E-11; }
  /*public*/ /*const*/ /*long*/ static get TicksPerDay() { return 864000000000n; }
  /*private*/ /*const*/ /*double*/ static get DaysPerTick() { 1.15740740740741E-12; }
  /*private*/ /*const*/ /*int*/ static get MillisPerSecond() { return 1000n; }
  /*private*/ /*const*/ /*int*/ static get MillisPerMinute() { return 60000n; }
  /*private*/ /*const*/ /*int*/ static get MillisPerHour() { return 3600000n; }
  /*private*/ /*const*/ /*int*/ static get MillisPerDay() { return 86400000n; }
  /*internal*/ /*const*/ /*long*/ static get MaxSeconds() { return 922337203685n; }
  /*internal*/ /*const*/ /*long*/ static get MinSeconds() { return -922337203685n; }
  /*internal*/ /*const*/ /*long*/ static get MaxMilliSeconds() { return 922337203685477n; }
  /*internal*/ /*const*/ /*long*/ static get MinMilliSeconds() { return -922337203685477n; }
  /*internal*/ /*const*/ /*long*/ static get TicksPerTenthSecond() { return 1000000n; }
  //internal long _ticks;
  //private static volatile bool _legacyConfigChecked;
  //private static volatile bool _legacyMode;

  constructor(ticks = 0n)
  {
    this._ticks = BigInt(ticks);
  }

  Clone()
  {
    return new CTimeSpan(this._ticks);
  }

  static Now()
  {
    return CTimeSpan.FromMilliseconds(Date.now());
  }

  /*public*/ static /*TimeSpan*/ FromTicks(/*long*/ ticks)
  {
    return new CTimeSpan(ticks);
  }

  /*public*/ static /*TimeSpan*/ FromMilliseconds(/*double*/ value)
  {
    return CTimeSpan.Interval(value, 1);
  }

  /*public*/ static /*TimeSpan*/ FromSeconds(/*double*/ value)
  {
    return CTimeSpan.Interval(value, 1000);
  }


  /*public*/ static /*TimeSpan*/ FromMinutes(/*double*/ value)
  {
    return CTimeSpan.Interval(value, 60000);
  }

  /*public*/ static /*TimeSpan*/ FromHours(/*double*/ value)
  {
    return CTimeSpan.Interval(value, 3600000);
  }

  /*public*/ static /*TimeSpan*/ FromDays(/*double*/ value)
  {
    return CTimeSpan.Interval(value, 86400000);
  }

  /*public*/ static /*TimeSpan*/ FromDate(/*Date*/ date)
  {
    return CTimeSpan.FromMilliseconds(date.getTime());
  }

  /*public*/ static /*CTimeSpan*/ FromTime(/*int*/ hours, /*int*/ minutes, /*int*/ seconds)
  {
    return CTimeSpan.FromTicks(CTimeSpan.TimeToTicks(hours, minutes, seconds));
  }

  /*public*/ /*long*/ get Ticks()
  {
    return Number(this._ticks);
  }

  /*public*/ /*int*/ get Days()
  {
    return Number(this._ticks / 864000000000n);
  }

  /*public*/ /*int*/ get Hours()
  {
    return Number(this._ticks / 36000000000n % 24n);
  }

  /*public*/ /*int*/ get Milliseconds()
  {
    return Number(this._ticks / 10000n % 1000n);
  }

  /*public*/ /*int*/ get Minutes()
  {
    return Number(this._ticks / 600000000n % 60n);
  }

  /*public*/ /*int*/ get Seconds()
  {
    return Number(this._ticks / 10000000n % 60n);
  }

  /*public*/ /*double*/ get TotalDays()
  {
    return /*(double)*/ this.Multiply(1.15740740740741E-12);
  }

  /*public*/ /*double*/ get TotalHours()
  {
    return /*(double)*/ this.Multiply(2.77777777777778E-11);
  }

  /*public*/ /*double*/ get TotalMilliseconds()
  {
    /*double*/ var num = /*(double)*/ this.Multiply(0.0001);
    if (num > 922337203685477.0)
      return 922337203685477.0;
    if (num < -922337203685477.0)
      return -922337203685477.0;
    return num;
  }

  /*public*/ /*double*/ get TotalMinutes()
  {
    return /*(double)*/ this.Multiply(1.66666666666667E-09);
  }

  /*public*/ /*double*/ get TotalSeconds()
  {
    return /*(double)*/ this.Multiply(1E-07);
  }

  /*public*/ /*TimeSpan*/ Add(/*TimeSpan*/ ts)
  {
    /*long*/ var ticks = this._ticks + ts._ticks;
    if (this._ticks >> 63n === ts._ticks >> 63n && this._ticks >> 63n !== ticks >> 63n)
      throw new COverflowException(CEnvironment.GetResourceString("TimeSpan overflowed because the duration is too long."));
    return CTimeSpan.FromTicks(ticks);
  }

  /*public*/ /*TimeSpan*/ Subtract(/*TimeSpan*/ ts)
  {
    /*long*/ var ticks = this._ticks - ts._ticks;
    if (this._ticks >> 63n !== ts._ticks >> 63n && this._ticks >> 63n !== ticks >> 63n)
      throw new COverflowException(CEnvironment.GetResourceString("TimeSpan overflowed because the duration is too long."));
    return CTimeSpan.FromTicks(ticks);
  }

  Multiply(num)
  {
    return Number(this._ticks) * Number(num);
  }

  /*private*/ static /*TimeSpan*/ Interval(/*double*/ value, /*int*/ scale)
  {
    if (Cdouble.IsNaN(value))
      throw new CArgumentException(CEnvironment.GetResourceString("TimeSpan does not accept floating point Not-a-Number values."));
    /*double*/ var num = value * Number(scale) + (Number(value) >= 0.0 ? 0.5 : -0.5);
    if (num > 922337203685477.0 || num < -922337203685477.0)
      throw new COverflowException(CEnvironment.GetResourceString("TimeSpan overflowed because the duration is too long."));
    return new CTimeSpan(Clong.FromNumber(num) * 10000n);
  }

  /*internal*/ static /*long*/ TimeToTicks(/*int*/ hour, /*int*/ minute, /*int*/ second)
  {
    /*long*/ var num = Clong.FromNumber(hour) * 3600n + Clong.FromNumber(minute) * 60n + Clong.FromNumber(second);
    if (num > 922337203685n || num < -922337203685n)
      throw new CArgumentOutOfRangeException(null, CEnvironment.GetResourceString("TimeSpan overflowed because the duration is too long."));
    return num * 10000000n;
  }

  static get Zero() { return new CTimeSpan(0n); }
  static get MaxValue() { return new CTimeSpan(Clong.MaxValue); }
  static get MinValue() { return new CTimeSpan(Clong.MinValue); }

  /*public*/ /*bool*/ /*operator*/ ["="](/*TimeSpan*/ t2)
  {
    this._ticks = t2._ticks;
    return this;
  }

  /*public*/ static /*bool*/ /*operator*/ ["+"](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    return CTimeSpan.FromTicks(t1._ticks + t2._ticks);
  }
  /*public*/ /*bool*/ /*operator*/ ["+"](/*TimeSpan*/ t2)
  {
    return CTimeSpan.FromTicks(this._ticks + t2._ticks);
  }

  /*public*/ static /*bool*/ /*operator*/ ["-"](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    return CTimeSpan.FromTicks(t1._ticks - t2._ticks);
  }
  /*public*/ /*bool*/ /*operator*/ ["-"](/*TimeSpan*/ t2)
  {
    return CTimeSpan.FromTicks(this._ticks - t2._ticks);
  }
  

  /*public*/ static /*bool*/ /*operator*/ ["+="](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    t1._ticks += t2._ticks;
    return t1;
  }
  /*public*/ /*bool*/ /*operator*/ ["+="](/*TimeSpan*/ t2)
  {
    this._ticks += t2._ticks;
    return this;
  }

  /*public*/ static /*bool*/ /*operator*/ ["-="](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    t1._ticks -= t2._ticks;
    return t1;
  }
  /*public*/ /*bool*/ /*operator*/ ["-="](/*TimeSpan*/ t2)
  {
    this._ticks -= t2._ticks;
    return this;
  }


  /*public*/ static /*bool*/ /*operator*/ ["<="](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    return t1._ticks <= t2._ticks;
  }
  /*public*/ /*bool*/ /*operator*/ ["<="](/*TimeSpan*/ t2)
  {
    return this._ticks <= t2._ticks;
  }

  /*public*/ static /*bool*/ /*operator*/ ["<"](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    return t1._ticks < t2._ticks;
  }
  /*public*/ /*bool*/ /*operator*/ ["<"](/*TimeSpan*/ t2)
  {
    return this._ticks < t2._ticks;
  }


  /*public*/ static /*bool*/ /*operator*/ [">="](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    return t1._ticks >= t2._ticks;
  }
  /*public*/ /*bool*/ /*operator*/ [">="](/*TimeSpan*/ t2)
  {
    return this._ticks >= t2._ticks;
  }

  /*public*/ static /*bool*/ /*operator*/ [">"](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    return t1._ticks > t2._ticks;
  }
  /*public*/ /*bool*/ /*operator*/ [">"](/*TimeSpan*/ t2)
  {
    return this._ticks > t2._ticks;
  }

  /*public*/ static /*bool*/ /*operator*/ ["=="](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    return t1._ticks === t2._ticks;
  }
  /*public*/ /*bool*/ /*operator*/ ["=="](/*TimeSpan*/ t2)
  {
    return this._ticks === t2._ticks;
  }

  /*public*/ static /*bool*/ /*operator*/ ["==="](/*TimeSpan*/ t1, /*TimeSpan*/ t2)
  {
    return t1._ticks === t2._ticks;
  }
  /*public*/ /*bool*/ /*operator*/ ["==="](/*TimeSpan*/ t2)
  {
    return this._ticks === t2._ticks;
  }
};

CStopwatch = class CStopwatch
{
  /*public*/ static /*readonly*/ /*long*/ get Frequency() { return 1E14; }
  /*public*/ static /*readonly*/ /*bool*/ get IsHighResolution() { return true; }

  constructor()
  {
    this.elapsed = 0;
    this.started = 0;
    this.is_running = false;
  }

  static GetTimestamp()
  {
    return performance.now() * 1E11;
  }

  static StartNew()
  {
    var stopwatch = new CStopwatch();
    stopwatch.Start();
    return stopwatch;
  }

  /*public*/ /*TimeSpan*/ get Elapsed()
  {
    if (CStopwatch.IsHighResolution)
      return CTimeSpan.FromTicks(Clong.FromNumber(this.ElapsedTicks / (CStopwatch.Frequency / 10000000)));
    return CTimeSpan.FromTicks(this.ElapsedTicks);
  }

  /*public*/ /*long*/ get ElapsedSeconds()
  {
    if (CStopwatch.IsHighResolution)
      return this.ElapsedTicks / (CStopwatch.Frequency / 1);
    return /*checked*/ (/*(long)*/ this.Elapsed.TotalSeconds);
  }

  /*public*/ /*long*/ get ElapsedMilliseconds()
  {
    if (CStopwatch.IsHighResolution)
      return this.ElapsedTicks / (CStopwatch.Frequency / 1000);
    return /*checked*/ (/*(long)*/ this.Elapsed.TotalMilliseconds);
  }

  /*public*/ /*long*/ get ElapsedTicks()
  {
    if (!this.is_running)
      return this.elapsed;
    return CStopwatch.GetTimestamp() - this.started + this.elapsed;
  }

  /*public*/ /*bool*/ get IsRunning()
  {
    return this.is_running;
  }

  /*public*/ /*void*/ Reset()
  {
    this.elapsed = 0;
    this.is_running = false;
  }

  /*public*/ /*void*/ Start()
  {
    if (this.is_running)
      return;
    this.started = CStopwatch.GetTimestamp();
    this.is_running = true;
  }

  /*public*/ /*void*/ Stop()
  {
    if (!this.is_running)
      return;
    this.elapsed += CStopwatch.GetTimestamp() - this.started;
    if (this.elapsed < 0)
      this.elapsed = 0;
    this.is_running = false;
  }

  /*public*/ /*void*/ Restart()
  {
    this.started = CStopwatch.GetTimestamp();
    this.elapsed = 0;
    this.is_running = true;
  }
};

IDisposable = class IDisposable {
  Dispose(disposing) {
    throw new Error("Not implemented");
  }
}

CEventHandlerClass = class CEventHandlerClass {
	constructor(options) {
		return FEventHandlerFactory(options);
	}
}

function FEventHandlerFactory(options) {
	const eventHandler = {handlers: []};

	eventHandler.send = (sender, args) => eventHandlerTag(eventHandler.send, sender, args);

	Object.setPrototypeOf(eventHandler, EventHandler.prototype);
	Object.setPrototypeOf(eventHandler.send, eventHandler);

	eventHandler.send.constructor = () => {
		throw new Error('`eventHandler.constructor()` is deprecated. Use `new eventHandler.Instance()` instead.');
	};

	eventHandler.send.Instance = CEventHandlerClass;

	return eventHandler.send;
};

function EventHandler(options) {
	return FEventHandlerFactory(options);
}

EventHandler.prototype["+="] = function Add(f, me) {
  this.handlers.push({f, me});
  return this;
}

EventHandler.prototype["-="] = function Rem(f, me) {
  let idx = -1;
  for (let i = 0; i < this.handlers.length; i++) {
    let x = this.handlers[i];
    if (x.f === f && x.me === me) {
      idx = i;
    }
  }
  if (idx >= 0) {
    this.handlers.splice(idx, 1);
  } else {
    throw new Error("Couldn't remove delegate from EventHandler");
  }
  return this;
}

EventHandler.prototype.RemoveCurrent = function() {
  if (this.Current != null)
  {
    this["-="](this.Current.f, this.Current.me);
    this.Current = null;
  }
}

function eventHandlerTag(me, sender, args) {
  //console.log('eventHandlerTag', me, sender, args);
  for (let x of me.handlers) {
    let was = me.Current;
    try {
      me.Current = x;
      x.f.call(x.me, sender, args);
    } finally {
      me.Current = was;
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = EventHandler;
}
if (typeof window !== 'undefined') {
  window.EventHandler = EventHandler;
}


