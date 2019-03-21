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

CEnvironment = class CEnvironment {
  static get IsRunningOnWindows() {
    return false;
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
    return BigInt(Math.floor(x));
  }
};

Cdouble = class Cdouble {
  static IsNaN(value) {
    return isNaN(value);
  }
}

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

EventHandlerClass = class EventHandlerClass {
	constructor(options) {
		return eventHandlerFactory(options);
	}
}


const eventHandlerFactory = options => {
	const eventHandler = {handlers: []};

	eventHandler.send = (sender, args) => eventHandlerTag(eventHandler.send, sender, args);

	Object.setPrototypeOf(eventHandler, EventHandler.prototype);
	Object.setPrototypeOf(eventHandler.send, eventHandler);

	eventHandler.send.constructor = () => {
		throw new Error('`eventHandler.constructor()` is deprecated. Use `new eventHandler.Instance()` instead.');
	};

	eventHandler.send.Instance = EventHandlerClass;

	return eventHandler.send;
};

function EventHandler(options) {
	return eventHandlerFactory(options);
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

function eventHandlerTag(me, sender, args) {
  //console.log('eventHandlerTag', me, sender, args);
  for (let x of me.handlers) {
    x.f.call(x.me, sender, args);
  }
}

if (typeof module !== 'undefined') {
  module.exports = EventHandler;
}
if (typeof window !== 'undefined') {
  window.EventHandler = EventHandler;
}


