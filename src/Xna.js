// Microsoft Public License (Ms-PL)
// FNA - Copyright 2009-2019 Ethan Lee and the MonoGame Team

// All rights reserved.

// This license governs use of the accompanying software. If you use the software,
// you accept this license. If you do not accept the license, do not use the
// software.

// 1. Definitions

// The terms "reproduce," "reproduction," "derivative works," and "distribution"
// have the same meaning here as under U.S. copyright law.

// A "contribution" is the original software, or any additions or changes to the
// software.

// A "contributor" is any person that distributes its contribution under this
// license.

// "Licensed patents" are a contributor's patent claims that read directly on its
// contribution.

// 2. Grant of Rights

// (A) Copyright Grant- Subject to the terms of this license, including the
// license conditions and limitations in section 3, each contributor grants you a
// non-exclusive, worldwide, royalty-free copyright license to reproduce its
// contribution, prepare derivative works of its contribution, and distribute its
// contribution or any derivative works that you create.

// (B) Patent Grant- Subject to the terms of this license, including the license
// conditions and limitations in section 3, each contributor grants you a
// non-exclusive, worldwide, royalty-free license under its licensed patents to
// make, have made, use, sell, offer for sale, import, and/or otherwise dispose of
// its contribution in the software or derivative works of the contribution in the
// software.

// 3. Conditions and Limitations

// (A) No Trademark License- This license does not grant you rights to use any
// contributors' name, logo, or trademarks.

// (B) If you bring a patent claim against any contributor over patents that you
// claim are infringed by the software, your patent license from such contributor
// to the software ends automatically.

// (C) If you distribute any portion of the software, you must retain all
// copyright, patent, trademark, and attribution notices that are present in the
// software.

// (D) If you distribute any portion of the software in source code form, you may
// do so only under this license by including a complete copy of this license with
// your distribution. If you distribute any portion of the software in compiled or
// object code form, you may only do so under a license that complies with this
// license.

// (E) The software is licensed "as-is." You bear the risk of using it. The
// contributors give no express warranties, guarantees or conditions. You may have
// additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the contributors exclude
// the implied warranties of merchantability, fitness for a particular purpose and
// non-infringement.


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

CGameTime = class CGameTime {
  constructor(/*TimeSpan*/ totalRealTime = CTimeSpan.Zero, /*TimeSpan*/ elapsedRealTime = CTimeSpan.Zero, /*bool*/ isRunningSlowly = false)
  {
    this.TotalGameTime = totalRealTime;
    this.ElapsedGameTime = elapsedRealTime;
    this.IsRunningSlowly = isRunningSlowly;
  }
};

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
  static Clamp(a, b, t) { return Math.max(a, Math.min(b, t)); }
};

CMathHelper = class CMathHelper {
  /// <summary>
  /// Represents the mathematical constant e(2.71828175).
  /// </summary>
  static get E() { return 2.71828175; }

  /// <summary>
  /// Represents the log base ten of e(0.4342945).
  /// </summary>
  static get Log10E() { return 0.4342945; }

  /// <summary>
  /// Represents the log base two of e(1.442695).
  /// </summary>
  static get Log2E() { return 1.442695; }

  /// <summary>
  /// Represents the value of pi(3.14159274).
  /// </summary>
  static get Pi() { return CMath.PI; }

  /// <summary>
  /// Represents the value of pi divided by two(1.57079637).
  /// </summary>
  static get PiOver2() { return (CMath.PI / 2.0); }

  /// <summary>
  /// Represents the value of pi divided by four(0.7853982).
  /// </summary>
  static get PiOver4() { return (CMath.PI / 4.0); }

  /// <summary>
  /// Represents the value of pi times two(6.28318548).
  /// </summary>
  static get TwoPi() { return (CMath.PI * 2.0); }

  static get MachineEpsilonFloat()
  {
    if (CMathHelper._MachineEpsilonFloat == null) {
      CMathHelper._MachineEpsilonFloat = CMathHelper.GetMachineEpsilonFloat();
    }
    return CMathHelper._MachineEpsilonFloat;
  }

  /// <summary>
  /// Returns the Cartesian coordinate for one axis of a point that is defined by a
  /// given triangle and two normalized barycentric (areal) coordinates.
  /// </summary>
  /// <param name="value1">
  /// The coordinate on one axis of vertex 1 of the defining triangle.
  /// </param>
  /// <param name="value2">
  /// The coordinate on the same axis of vertex 2 of the defining triangle.
  /// </param>
  /// <param name="value3">
  /// The coordinate on the same axis of vertex 3 of the defining triangle.
  /// </param>
  /// <param name="amount1">
  /// The normalized barycentric (areal) coordinate b2, equal to the weighting factor
  /// for vertex 2, the coordinate of which is specified in value2.
  /// </param>
  /// <param name="amount2">
  /// The normalized barycentric (areal) coordinate b3, equal to the weighting factor
  /// for vertex 3, the coordinate of which is specified in value3.
  /// </param>
  /// <returns>
  /// Cartesian coordinate of the specified point with respect to the axis being used.
  /// </returns>
  static Barycentric(
   /*float*/ value1,
   /*float*/ value2,
   /*float*/ value3,
   /*float*/ amount1,
   /*float*/ amount2
  ) {
    return value1 + (value2 - value1) * amount1 + (value3 - value1) * amount2;
  }

  /// <summary>
  /// Performs a Catmull-Rom interpolation using the specified positions.
  /// </summary>
  /// <param name="value1">The first position in the interpolation.</param>
  /// <param name="value2">The second position in the interpolation.</param>
  /// <param name="value3">The third position in the interpolation.</param>
  /// <param name="value4">The fourth position in the interpolation.</param>
  /// <param name="amount">Weighting factor.</param>
  /// <returns>A position that is the result of the Catmull-Rom interpolation.</returns>
  static CatmullRom(
   /*float*/ value1,
   /*float*/ value2,
   /*float*/ value3,
   /*float*/ value4,
   /*float*/ amount
  ) {
    /* Using formula from http://www.mvps.org/directx/articles/catmull/
     * Internally using doubles not to lose precision.
     */
    var amountSquared = amount * amount;
    var amountCubed = amountSquared * amount;
    return (
      0.5 *
      (
        ((2.0 * value2 + (value3 - value1) * amount) +
        ((2.0 * value1 - 5.0 * value2 + 4.0 * value3 - value4) * amountSquared) +
        (3.0 * value2 - value1 - 3.0 * value3 + value4) * amountCubed)
      )
    );
  }

  /// <summary>
  /// Restricts a value to be within a specified range.
  /// </summary>
  /// <param name="value">The value to clamp.</param>
  /// <param name="min">
  /// The minimum value. If <c>value</c> is less than <c>min</c>, <c>min</c>
  /// will be returned.
  /// </param>
  /// <param name="max">
  /// The maximum value. If <c>value</c> is greater than <c>max</c>, <c>max</c>
  /// will be returned.
  /// </param>
  /// <returns>The clamped value.</returns>
  static /*float*/ Clamp(/*float*/ value, /*float*/ min, /*float*/ max)
  {
    // First we check to see if we're greater than the max.
    value = (value > max) ? max : value;

    // Then we check to see if we're less than the min.
    value = (value < min) ? min : value;

    // There's no check to see if min > max.
    return value;
  }

  /// <summary>
  /// Calculates the absolute value of the difference of two values.
  /// </summary>
  /// <param name="value1">Source value.</param>
  /// <param name="value2">Source value.</param>
  /// <returns>Distance between the two values.</returns>
  static /*float*/ Distance(/*float*/ value1, /*float*/ value2)
  {
    return CMath.Abs(value1 - value2);
  }

  /// <summary>
  /// Performs a Hermite spline interpolation.
  /// </summary>
  /// <param name="value1">Source position.</param>
  /// <param name="tangent1">Source tangent.</param>
  /// <param name="value2">Source position.</param>
  /// <param name="tangent2">Source tangent.</param>
  /// <param name="amount">Weighting factor.</param>
  /// <returns>The result of the Hermite spline interpolation.</returns>
  static /*float*/ Hermite(
    /*float*/ value1,
    /*float*/ tangent1,
    /*float*/ value2,
    /*float*/ tangent2,
    /*float*/ amount
  ) {
    /* All transformed to double not to lose precision
     * Otherwise, for high numbers of param:amount the result is NaN instead
     * of Infinity.
     */
    /*double*/ var v1 = value1, v2 = value2, t1 = tangent1, t2 = tangent2, s = amount;
    /*double*/ var result;
    /*double*/ var sCubed = s * s * s;
    /*double*/ var sSquared = s * s;

    if (CMathHelper.WithinEpsilon(amount, 0))
    {
      result = value1;
    }
    else if (CMathHelper.WithinEpsilon(amount, 1))
    {
      result = value2;
    }
    else
    {
      result = (
        ((2 * v1 - 2 * v2 + t2 + t1) * sCubed) +
        ((3 * v2 - 3 * v1 - 2 * t1 - t2) * sSquared) +
        (t1 * s) +
        v1
      );
    }

    return /*(float)*/ result;
  }


  /// <summary>
  /// Linearly interpolates between two values.
  /// </summary>
  /// <param name="value1">Source value.</param>
  /// <param name="value2">Source value.</param>
  /// <param name="amount">
  /// Value between 0 and 1 indicating the weight of value2.
  /// </param>
  /// <returns>Interpolated value.</returns>
  /// <remarks>
  /// This method performs the linear interpolation based on the following formula.
  /// <c>value1 + (value2 - value1) * amount</c>
  /// Passing amount a value of 0 will cause value1 to be returned, a value of 1 will
  /// cause value2 to be returned.
  /// </remarks>
  static /*float*/ Lerp(/*float*/ value1, /*float*/ value2, /*float*/ amount)
  {
    return value1 + (value2 - value1) * amount;
  }

  /// <summary>
  /// Returns the greater of two values.
  /// </summary>
  /// <param name="value1">Source value.</param>
  /// <param name="value2">Source value.</param>
  /// <returns>The greater value.</returns>
  static /*float*/ Max(/*float*/ value1, /*float*/ value2)
  {
    return value1 > value2 ? value1 : value2;
  }

  /// <summary>
  /// Returns the lesser of two values.
  /// </summary>
  /// <param name="value1">Source value.</param>
  /// <param name="value2">Source value.</param>
  /// <returns>The lesser value.</returns>
  static /*float*/ Min(/*float*/ value1, /*float*/ value2)
  {
    return value1 < value2 ? value1 : value2;
  }

  /// <summary>
  /// Interpolates between two values using a cubic equation.
  /// </summary>
  /// <param name="value1">Source value.</param>
  /// <param name="value2">Source value.</param>
  /// <param name="amount">Weighting value.</param>
  /// <returns>Interpolated value.</returns>
  static /*float*/ SmoothStep(/*float*/ value1, /*float*/ value2, /*float*/ amount)
  {
    /* It is expected that 0 < amount < 1.
     * If amount < 0, return value1.
     * If amount > 1, return value2.
     */
    /*float*/ var result = CMathHelper.Clamp(amount, 0, 1);
    result = CMathHelper.Hermite(value1, 0, value2, 0, result);

    return result;
  }

  /// <summary>
  /// Converts radians to degrees.
  /// </summary>
  /// <param name="radians">The angle in radians.</param>
  /// <returns>The angle in degrees.</returns>
  /// <remarks>
  /// This method uses double precision internally, though it returns single float.
  /// Factor = 180 / pi
  /// </remarks>
  static /*float*/ ToDegrees(/*float*/ radians)
  {
    return /*(float)*/ (radians * 57.295779513082320876798154814105);
  }

  /// <summary>
  /// Converts degrees to radians.
  /// </summary>
  /// <param name="degrees">The angle in degrees.</param>
  /// <returns>The angle in radians.</returns>
  /// <remarks>
  /// This method uses double precision internally, though it returns single float.
  /// Factor = pi / 180
  /// </remarks>
  static /*float*/ ToRadians(/*float*/ degrees)
  {
    return /*(float)*/ (degrees * 0.017453292519943295769236907684886);
  }

  /// <summary>
  /// Reduces a given angle to a value between pi and -pi.
  /// </summary>
  /// <param name="angle">The angle to reduce, in radians.</param>
  /// <returns>The new angle, in radians.</returns>
  static /*float*/ WrapAngle(/*float*/ angle)
  {
    if ((angle > -CMathHelper.Pi) && (angle <= CMathHelper.Pi))
    {
      return angle;
    }
    angle %= CMathHelper.TwoPi;
    if (angle <= -CMathHelper.Pi)
    {
      return angle + CMathHelper.TwoPi;
    }
    if (angle > CMathHelper.Pi)
    {
      return angle - CMathHelper.TwoPi;
    }
    return angle;
  }

  // FIXME: This could be an extension! ClampIntEXT? -flibit
  /// <summary>
  /// Restricts a value to be within a specified range.
  /// </summary>
  /// <param name="value">The value to clamp.</param>
  /// <param name="min">
  /// The minimum value. If <c>value</c> is less than <c>min</c>, <c>min</c>
  /// will be returned.
  /// </param>
  /// <param name="max">
  /// The maximum value. If <c>value</c> is greater than <c>max</c>, <c>max</c>
  /// will be returned.
  /// </param>
  /// <returns>The clamped value.</returns>
  /*internal*/ static /*int*/ ClampI(/*int*/ value, /*int*/ min, /*int*/ max)
  {
    value = (value > max) ? max : value;
    value = (value < min) ? min : value;
    return value;
  }

  /*internal*/ static /*bool*/ WithinEpsilon(/*float*/ floatA, /*float*/ floatB)
  {
    return CMath.Abs(floatA - floatB) < CMathHelper.MachineEpsilonFloat;
  }

  /*internal*/ static /*int*/ ClosestMSAAPower(/*int*/ value)
  {
    /* Checking for the highest power of two _after_ than the given int:
     * http://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
     * Take result, divide by 2, get the highest power of two _before_!
     * -flibit
     */
    if (value === 1)
    {
      // ... Except for 1, which is invalid for MSAA -flibit
      return 0;
    }
    /*int*/ var result = value - 1;
    result |= result >> 1;
    result |= result >> 2;
    result |= result >> 4;
    result |= result >> 8;
    result |= result >> 16;
    result += 1;
    if (result === value)
    {
      return result;
    }
    return result >> 1;
  }


  /// <summary>
  /// Find the current machine's Epsilon for the float data type.
  /// (That is, the largest float, e,  where e === 0.0 is true.)
  /// </summary>
  static GetMachineEpsilonFloat()
  {
    var machineEpsilon = 1.0;
    var comparison;

    /* Keep halving the working value of machineEpsilon until we get a number that
     * when added to 1.0 will still evaluate as equal to 1.0.
     */
    do
    {
      machineEpsilon *= 0.5;
      comparison = 1.0 + machineEpsilon;
    }
    while (comparison > 1.0);

    return machineEpsilon;
  }
};

CVector2 = class CVector2 {
  constructor(x = 0.0, y = 0.0) {
    this.X = x;
    this.Y = y;
  }

  Clone(dst = new CVector2()) {
    dst.Assign(this);
    return dst;
  }

  Assign(value) {
    this.X = value.X;
    this.Y = value.Y;
  }

  Reset(x, y) {
    this.X = x;
    this.Y = y;
  }

  /// <summary>
  /// Creates a new <see cref="Vector2"/> that contains a transformation of 2d-vector by the specified <see cref="Matrix"/>.
  /// </summary>
  /// <param name="position">Source <see cref="Vector2"/>.</param>
  /// <param name="matrix">The transformation <see cref="Matrix"/>.</param>
  /// <param name="result">Transformed <see cref="Vector2"/> as an output parameter.</param>
  /*public*/ static /*void*/ TransformByMatrix(
    /*ref*/ /*Vector2*/ position,
    /*ref*/ /*Matrix*/ matrix,
    /*out*/ /*Vector2*/ result = new CVector2()
  ) {
    /*float*/ var x = (position.X * matrix.M11) + (position.Y * matrix.M21) + matrix.M41;
    /*float*/ var y = (position.X * matrix.M12) + (position.Y * matrix.M22) + matrix.M42;
    result.X = x;
    result.Y = y;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Vector2"/> that contains a transformation of 2d-vector by the specified <see cref="Quaternion"/>, representing the rotation.
  /// </summary>
  /// <param name="value">Source <see cref="Vector2"/>.</param>
  /// <param name="rotation">The <see cref="Quaternion"/> which contains rotation transformation.</param>
  /// <param name="result">Transformed <see cref="Vector2"/> as an output parameter.</param>
  /*public*/ static /*void*/ TransformByQuaternion(
    /*ref*/ /*Vector2*/ value,
    /*ref*/ /*Quaternion*/ rotation,
    /*out*/ /*Vector2*/ result = new CVector2()
  ) {
    /*float*/ var x = 2 * -(rotation.Z * value.Y);
    /*float*/ var y = 2 * (rotation.Z * value.X);
    /*float*/ var z = 2 * (rotation.X * value.Y - rotation.Y * value.X);

    result.X = value.X + x * rotation.W + (rotation.Y * z - rotation.Z * y);
    result.Y = value.Y + y * rotation.W + (rotation.Z * x - rotation.X * z);
    return result;
  }

  static get Zero() {
    return new CVector2(0, 0);
  }
  static get One() {
    return new CVector2(1, 1);
  }
  static get UnitX() {
    return new CVector2(1, 0);
  }
  static get UnitY() {
    return new CVector2(0, 1);
  }
  static get Up() {
    return new CVector2(0, 1);
  }
  static get Down() {
    return new CVector2(0, -1);
  }
  static get Right() {
    return new CVector2(1, 0);
  }
  static get Left() {
    return new CVector2(-1, 0);
  }
};

CVector3 = class CVector3 {
  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 0, 0, 0.
  /// </summary>
  /*public*/ static get /*Vector3*/ Zero()
  {
    return CVector3.zero;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 1, 1, 1.
  /// </summary>
  /*public*/ static get /*Vector3*/ One()
  {
    return CVector3.one;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 1, 0, 0.
  /// </summary>
  /*public*/ static get /*Vector3*/ UnitX()
  {
    return CVector3.unitX;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 0, 1, 0.
  /// </summary>
  /*public*/ static get /*Vector3*/ UnitY()
  {
    return CVector3.unitY;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 0, 0, 1.
  /// </summary>
  /*public*/ static get /*Vector3*/ UnitZ()
  {
    return CVector3.unitZ;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 0, 1, 0.
  /// </summary>
  /*public*/ static get /*Vector3*/ Up()
  {
    return CVector3.up;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 0, -1, 0.
  /// </summary>
  /*public*/ static get /*Vector3*/ Down()
  {
    return CVector3.down;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 1, 0, 0.
  /// </summary>
  /*public*/ static get /*Vector3*/ Right()
  {
    return CVector3.right;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components -1, 0, 0.
  /// </summary>
  /*public*/ static get /*Vector3*/ Left()
  {
    return CVector3.left;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 0, 0, -1.
  /// </summary>
  /*public*/ static get /*Vector3*/ Forward()
  {
    return CVector3.forward;
  }

  /// <summary>
  /// Returns a <see cref="Vector3"/> with components 0, 0, 1.
  /// </summary>
  /*public*/ static get /*Vector3*/ Backward()
  {
    return CVector3.backward;
  }

  constructor(x = 0.0, y = 0.0, z = 0.0) {
    this.X = x;
    this.Y = y;
    this.Z = z;
  }

  /// <summary>
  /// Returns the length of this <see cref="Vector3"/>.
  /// </summary>
  /// <returns>The length of this <see cref="Vector3"/>.</returns>
  /*public*/ /*float*/ Length()
  {
    return /*(float)*/ CMath.Sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z));
  }

  /// <summary>
  /// Returns the squared length of this <see cref="Vector3"/>.
  /// </summary>
  /// <returns>The squared length of this <see cref="Vector3"/>.</returns>
  /*public*/ /*float*/ LengthSquared()
  {
    return (this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z);
  }

  /// <summary>
  /// Turns this <see cref="Vector3"/> to a unit vector with the same direction.
  /// </summary>
  /*public*/ /*void*/ Normalize()
  {
    /*float*/ var factor = 1.0 / /*(float)*/ CMath.Sqrt(
      (this.X * this.X) +
      (this.Y * this.Y) +
      (this.Z * this.Z)
    );
    this.X *= factor;
    this.Y *= factor;
    this.Z *= factor;
    return this;
  }

  /// <summary>
  /// Computes the cross product of two vectors.
  /// </summary>
  /// <param name="vector1">The first vector.</param>
  /// <param name="vector2">The second vector.</param>
  /// <param name="result">The cross product of two vectors as an output parameter.</param>
  /*public*/ static /*void*/ Cross(/*ref*/ /*Vector3*/ vector1, /*ref*/ /*Vector3*/ vector2, /*out*/ /*Vector3*/ result = new CVector3())
  {
    /*float*/ var x = vector1.Y * vector2.Z - vector2.Y * vector1.Z;
    /*float*/ var y = -(vector1.X * vector2.Z - vector2.X * vector1.Z);
    /*float*/ var z = vector1.X * vector2.Y - vector2.X * vector1.Y;
    result.X = x;
    result.Y = y;
    result.Z = z;
    return result;
  }

  /// <summary>
  /// Returns the distance between two vectors.
  /// </summary>
  /// <param name="value1">The first vector.</param>
  /// <param name="value2">The second vector.</param>
  /// <param name="result">The distance between two vectors as an output parameter.</param>
  /*public*/ static /*void*/ Distance(/*ref*/ /*Vector3*/ value1, /*ref*/ /*Vector3*/ value2)
  {
    var result = CVector3.DistanceSquared(/*ref*/ value1, /*ref*/ value2);
    return /*(float)*/ CMath.Sqrt(result);
  }

  /// <summary>
  /// Returns the squared distance between two vectors.
  /// </summary>
  /// <param name="value1">The first vector.</param>
  /// <param name="value2">The second vector.</param>
  /// <returns>The squared distance between two vectors.</returns>
  /*public*/ static /*float*/ DistanceSquared(/*Vector3*/ value1, /*Vector3*/ value2)
  {
    return (
      (value1.X - value2.X) * (value1.X - value2.X) +
      (value1.Y - value2.Y) * (value1.Y - value2.Y) +
      (value1.Z - value2.Z) * (value1.Z - value2.Z)
    );
  }

  /// <summary>
  /// Returns a dot product of two vectors.
  /// </summary>
  /// <param name="vector1">The first vector.</param>
  /// <param name="vector2">The second vector.</param>
  /// <returns>The dot product of two vectors.</returns>
  /*public*/ static /*float*/ Dot(/*Vector3*/ vector1, /*Vector3*/ vector2)
  {
    return vector1.X * vector2.X + vector1.Y * vector2.Y + vector1.Z * vector2.Z;
  }

  /// <summary>
  /// Creates a new <see cref="Vector3"/> that contains a multiplication of <see cref="Vector3"/> and a scalar.
  /// </summary>
  /// <param name="value1">Source <see cref="Vector3"/>.</param>
  /// <param name="scaleFactor">Scalar value.</param>
  /// <param name="result">The result of the multiplication with a scalar as an output parameter.</param>
  /*public*/ static /*void*/ Multiply(/*ref*/ /*Vector3*/ value1, /*float*/ scaleFactor, /*out*/ /*Vector3*/ result = new CVector3())
  {
    result.X = value1.X * scaleFactor;
    result.Y = value1.Y * scaleFactor;
    result.Z = value1.Z * scaleFactor;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Vector3"/> that contains the specified vector inversion.
  /// </summary>
  /// <param name="value">Source <see cref="Vector3"/>.</param>
  /// <param name="result">The result of the vector inversion as an output parameter.</param>
  /*public*/ static /*void*/ Negate(/*ref*/ /*Vector3*/ value, /*out*/ /*Vector3*/ result = new CVector3())
  {
    result.X = -value.X;
    result.Y = -value.Y;
    result.Z = -value.Z;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Vector3"/> that contains a normalized values from another vector.
  /// </summary>
  /// <param name="value">Source <see cref="Vector3"/>.</param>
  /// <param name="result">Unit vector as an output parameter.</param>
  /*public*/ static /*void*/ Normalize(/*ref*/ /*Vector3*/ value, /*out*/ /*Vector3*/ result = new CVector3())
  {
    /*float*/ var factor = 1.0 / /*(float)*/ CMath.Sqrt(
      (value.X * value.X) +
      (value.Y * value.Y) +
      (value.Z * value.Z)
    );
    result.X = value.X * factor;
    result.Y = value.Y * factor;
    result.Z = value.Z * factor;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Vector3"/> that contains reflect vector of the given vector and normal.
  /// </summary>
  /// <param name="vector">Source <see cref="Vector3"/>.</param>
  /// <param name="normal">Reflection normal.</param>
  /// <param name="result">Reflected vector as an output parameter.</param>
  /*public*/ static /*void*/ Reflect(/*ref*/ /*Vector3*/ vector, /*ref*/ /*Vector3*/ normal, /*out*/ /*Vector3*/ result = new CVector3())
  {
    /* I is the original array.
     * N is the normal of the incident plane.
     * R = I - (2 * N * ( DotProduct[ I,N] ))
     */

    // Inline the dotProduct here instead of calling method.
    /*float*/ var dotProduct = ((vector.X * normal.X) + (vector.Y * normal.Y)) +
          (vector.Z * normal.Z);
    result.X = vector.X - (2.0 * normal.X) * dotProduct;
    result.Y = vector.Y - (2.0 * normal.Y) * dotProduct;
    result.Z = vector.Z - (2.0 * normal.Z) * dotProduct;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Vector3"/> that contains cubic interpolation of the specified vectors.
  /// </summary>
  /// <param name="value1">Source <see cref="Vector3"/>.</param>
  /// <param name="value2">Source <see cref="Vector3"/>.</param>
  /// <param name="amount">Weighting value.</param>
  /// <param name="result">Cubic interpolation of the specified vectors as an output parameter.</param>
  /*public*/ static /*void*/ SmoothStep(
    /*ref*/ /*Vector3*/ value1,
    /*ref*/ /*Vector3*/ value2,
    /*float*/ amount,
    /*out*/ /*Vector3*/ result = new CVector3()
  ) {
    result.X = CMathHelper.SmoothStep(value1.X, value2.X, amount);
    result.Y = CMathHelper.SmoothStep(value1.Y, value2.Y, amount);
    result.Z = CMathHelper.SmoothStep(value1.Z, value2.Z, amount);
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Vector3"/> that contains subtraction of on <see cref="Vector3"/> from a another.
  /// </summary>
  /// <param name="value1">Source <see cref="Vector3"/>.</param>
  /// <param name="value2">Source <see cref="Vector3"/>.</param>
  /// <param name="result">The result of the vector subtraction as an output parameter.</param>
  /*public*/ static /*void*/ Subtract(/*ref*/ /*Vector3*/ value1, /*ref*/ /*Vector3*/ value2, /*out*/ /*Vector3*/ result = new CVector3())
  {
    result.X = value1.X - value2.X;
    result.Y = value1.Y - value2.Y;
    result.Z = value1.Z - value2.Z;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Vector3"/> that contains a transformation of 3d-vector by the specified <see cref="Matrix"/>.
  /// </summary>
  /// <param name="position">Source <see cref="Vector3"/>.</param>
  /// <param name="matrix">The transformation <see cref="Matrix"/>.</param>
  /// <param name="result">Transformed <see cref="Vector3"/> as an output parameter.</param>
  /*public*/ static /*void*/ TransformByMatrix(
    /*ref*/ /*Vector3*/ position,
    /*ref*/ /*Matrix*/ matrix,
    /*out*/ /*Vector3*/ result = new CVector3()
  ) {
    /*float*/ var x = (
      (position.X * matrix.M11) +
      (position.Y * matrix.M21) +
      (position.Z * matrix.M31) +
      matrix.M41
    );
    /*float*/ var y = (
      (position.X * matrix.M12) +
      (position.Y * matrix.M22) +
      (position.Z * matrix.M32) +
      matrix.M42
    );
    /*float*/ var z = (
      (position.X * matrix.M13) +
      (position.Y * matrix.M23) +
      (position.Z * matrix.M33) +
      matrix.M43
    );
    result.X = x;
    result.Y = y;
    result.Z = z;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Vector3"/> that contains a transformation of 3d-vector by the specified <see cref="Quaternion"/>, representing the rotation.
  /// </summary>
  /// <param name="value">Source <see cref="Vector3"/>.</param>
  /// <param name="rotation">The <see cref="Quaternion"/> which contains rotation transformation.</param>
  /// <param name="result">Transformed <see cref="Vector3"/> as an output parameter.</param>
  /*public*/ static /*void*/ TransformByQuaternion(
    /*ref*/ /*Vector3*/ value,
    /*ref*/ /*Quaternion*/ rotation,
    /*out*/ /*Vector3*/ result = new CVector3()
  ) {
    /*float*/ var x = 2 * (rotation.Y * value.Z - rotation.Z * value.Y);
    /*float*/ var y = 2 * (rotation.Z * value.X - rotation.X * value.Z);
    /*float*/ var z = 2 * (rotation.X * value.Y - rotation.Y * value.X);

    result.X = value.X + x * rotation.W + (rotation.Y * z - rotation.Z * y);
    result.Y = value.Y + y * rotation.W + (rotation.Z * x - rotation.X * z);
    result.Z = value.Z + z * rotation.W + (rotation.X * y - rotation.Y * x);
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Vector3"/> that contains a transformation of the specified normal by the specified <see cref="Matrix"/>.
  /// </summary>
  /// <param name="normal">Source <see cref="Vector3"/> which represents a normal vector.</param>
  /// <param name="matrix">The transformation <see cref="Matrix"/>.</param>
  /// <param name="result">Transformed normal as an output parameter.</param>
  /*public*/ static /*void*/ TransformNormal(
    /*ref*/ /*Vector3*/ normal,
    /*ref*/ /*Matrix*/ matrix,
    /*out*/ /*Vector3*/ result = new CVector3()
  ) {
    /*float*/ var x = (normal.X * matrix.M11) + (normal.Y * matrix.M21) + (normal.Z * matrix.M31);
    /*float*/ var y = (normal.X * matrix.M12) + (normal.Y * matrix.M22) + (normal.Z * matrix.M32);
    /*float*/ var z = (normal.X * matrix.M13) + (normal.Y * matrix.M23) + (normal.Z * matrix.M33);
    result.X = x;
    result.Y = y;
    result.Z = z;
    return result;
  }
};

/*private*/ /*static*/ CVector3.zero = new CVector3(0, 0, 0); // Not readonly for performance -flibit
/*private*/ /*static*/ /*readonly*/ CVector3.one = new CVector3(1, 1, 1);
/*private*/ /*static*/ /*readonly*/ CVector3.unitX = new CVector3(1, 0, 0);
/*private*/ /*static*/ /*readonly*/ CVector3.unitY = new CVector3(0, 1, 0);
/*private*/ /*static*/ /*readonly*/ CVector3.unitZ = new CVector3(0, 0, 1);
/*private*/ /*static*/ /*readonly*/ CVector3.up = new CVector3(0, 1, 0);
/*private*/ /*static*/ /*readonly*/ CVector3.down = new CVector3(0, -1, 0);
/*private*/ /*static*/ /*readonly*/ CVector3.right = new CVector3(1, 0, 0);
/*private*/ /*static*/ /*readonly*/ CVector3.left = new CVector3(-1, 0, 0);
/*private*/ /*static*/ /*readonly*/ CVector3.forward = new CVector3(0, 0, -1);
/*private*/ /*static*/ /*readonly*/ CVector3.backward = new CVector3(0, 0, 1);


CQuaternion = class CQuaternion {
  constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
    this.X = x;
    this.Y = y;
    this.Z = z;
    this.W = w;
  }

  static Assign(dst, src) {
    dst.X = src.X;
    dst.Y = src.Y;
    dst.Z = src.Z;
    dst.W = src.W;
  }

  /// <summary>
  /// Creates a new <see cref="Quaternion"/> that contains the sum of two quaternions.
  /// </summary>
  /// <param name="quaternion1">Source <see cref="Quaternion"/>.</param>
  /// <param name="quaternion2">Source <see cref="Quaternion"/>.</param>
  /// <param name="result">The result of the quaternion addition as an output parameter.</param>
  /*public*/ static /*void*/ Add(
    /*ref*/ /*Quaternion*/ quaternion1,
    /*ref*/ /*Quaternion*/ quaternion2,
    /*out*/ /*Quaternion*/ result = new CQuaternion()
  ) {
    result.X = quaternion1.X + quaternion2.X;
    result.Y = quaternion1.Y + quaternion2.Y;
    result.Z = quaternion1.Z + quaternion2.Z;
    result.W = quaternion1.W + quaternion2.W;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Quaternion"/> that contains concatenation between two quaternion.
  /// </summary>
  /// <param name="value1">The first <see cref="Quaternion"/> to concatenate.</param>
  /// <param name="value2">The second <see cref="Quaternion"/> to concatenate.</param>
  /// <param name="result">The result of rotation of <paramref name="value1"/> followed by <paramref name="value2"/> rotation as an output parameter.</param>
  /*public*/ static /*void*/ Concatenate(
    /*ref*/ /*Quaternion*/ value1,
    /*ref*/ /*Quaternion*/ value2,
    /*out*/ /*Quaternion*/ result = new CQuaternion()
  ) {
    /*float*/ var x1 = value1.X;
    /*float*/ var y1 = value1.Y;
    /*float*/ var z1 = value1.Z;
    /*float*/ var w1 = value1.W;

    /*float*/ var x2 = value2.X;
    /*float*/ var y2 = value2.Y;
    /*float*/ var z2 = value2.Z;
    /*float*/ var w2 = value2.W;

    result.X = ((x2 * w1) + (x1 * w2)) + ((y2 * z1) - (z2 * y1));
    result.Y = ((y2 * w1) + (y1 * w2)) + ((z2 * x1) - (x2 * z1));
    result.Z = ((z2 * w1) + (z1 * w2)) + ((x2 * y1) - (y2 * x1));
    result.W = (w2 * w1) - (((x2 * x1) + (y2 * y1)) + (z2 * z1));
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Quaternion"/> that contains conjugated version of the specified quaternion.
  /// </summary>
  /// <param name="value">The quaternion which values will be used to create the conjugated version.</param>
  /// <param name="result">The conjugated version of the specified quaternion as an output parameter.</param>
  /*public*/ static /*void*/ Conjugate(/*ref*/ /*Quaternion*/ value, /*out*/ /*Quaternion*/ result = new CQuaternion())
  {
    result.X = -value.X;
    result.Y = -value.Y;
    result.Z = -value.Z;
    result.W = value.W;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Quaternion"/> from the specified axis and angle.
  /// </summary>
  /// <param name="axis">The axis of rotation.</param>
  /// <param name="angle">The angle in radians.</param>
  /// <param name="result">The new quaternion builded from axis and angle as an output parameter.</param>
  /*public*/ static /*void*/ CreateFromAxisAngle(
    /*ref*/ /*Vector3*/ axis,
    /*float*/ angle,
    /*out*/ /*Quaternion*/ result = new CQuaternion()
  ) {
    /*float*/ var half = angle * 0.5;
    /*float*/ var sin = /*(float)*/ CMath.Sin(/*(double)*/ half);
    /*float*/ var cos = /*(float)*/ CMath.Cos(/*(double)*/ half);
    result.X = axis.X * sin;
    result.Y = axis.Y * sin;
    result.Z = axis.Z * sin;
    result.W = cos;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Quaternion"/> from the specified <see cref="Matrix"/>.
  /// </summary>
  /// <param name="matrix">The rotation matrix.</param>
  /// <param name="result">A quaternion composed from the rotation part of the matrix as an output parameter.</param>
  static CreateFromRotationMatrix(/*ref Matrix*/ matrix, /*out Quaternion*/ result = new CQuaternion())
  {
    /*float*/ var sqrt;
    /*float*/ var half;
    /*float*/ var scale = matrix.M11 + matrix.M22 + matrix.M33;

    if (scale > 0.0)
    {
      sqrt = /*(float)*/ CMath.Sqrt(scale + 1.0);
      result.W = sqrt * 0.5;
      sqrt = 0.5 / sqrt;

      result.X = (matrix.M23 - matrix.M32) * sqrt;
      result.Y = (matrix.M31 - matrix.M13) * sqrt;
      result.Z = (matrix.M12 - matrix.M21) * sqrt;
    }
    else if ((matrix.M11 >= matrix.M22) && (matrix.M11 >= matrix.M33))
    {
      sqrt = /*(float)*/ CMath.Sqrt(1.0 + matrix.M11 - matrix.M22 - matrix.M33);
      half = 0.5 / sqrt;

      result.X = 0.5 * sqrt;
      result.Y = (matrix.M12 + matrix.M21) * half;
      result.Z = (matrix.M13 + matrix.M31) * half;
      result.W = (matrix.M23 - matrix.M32) * half;
    }
    else if (matrix.M22 > matrix.M33)
    {
      sqrt = /*(float)*/ CMath.Sqrt(1.0 + matrix.M22 - matrix.M11 - matrix.M33);
      half = 0.5/sqrt;

      result.X = (matrix.M21 + matrix.M12)*half;
      result.Y = 0.5*sqrt;
      result.Z = (matrix.M32 + matrix.M23)*half;
      result.W = (matrix.M31 - matrix.M13)*half;
    }
    else
    {
      sqrt = /*(float)*/ CMath.Sqrt(1.0 + matrix.M33 - matrix.M11 - matrix.M22);
      half = 0.5 / sqrt;

      result.X = (matrix.M31 + matrix.M13) * half;
      result.Y = (matrix.M32 + matrix.M23) * half;
      result.Z = 0.5 * sqrt;
      result.W = (matrix.M12 - matrix.M21) * half;
    }
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Quaternion"/> from the specified yaw, pitch and roll angles.
  /// </summary>
  /// <param name="yaw">Yaw around the y axis in radians.</param>
  /// <param name="pitch">Pitch around the x axis in radians.</param>
  /// <param name="roll">Roll around the z axis in radians.</param>
  /// <param name="result">A new quaternion from the concatenated yaw, pitch, and roll angles as an output parameter.</param>
  /*public*/ static /*void*/ CreateFromYawPitchRoll(
    /*float*/ yaw,
    /*float*/ pitch,
    /*float*/ roll,
    /*out*/ /*Quaternion*/ result = new CQuaternion())
  {
    /*float*/ var halfRoll = roll * 0.5;
    /*float*/ var sinRoll = /*(float)*/ CMath.Sin(halfRoll);
    /*float*/ var cosRoll = /*(float)*/ CMath.Cos(halfRoll);
    /*float*/ var halfPitch = pitch * 0.5;
    /*float*/ var sinPitch = /*(float)*/ CMath.Sin(halfPitch);
    /*float*/ var cosPitch = /*(float)*/ CMath.Cos(halfPitch);
    /*float*/ var halfYaw = yaw * 0.5;
    /*float*/ var sinYaw = /*(float)*/ CMath.Sin(halfYaw);
    /*float*/ var cosYaw = /*(float)*/ CMath.Cos(halfYaw);
    result.X = ((cosYaw * sinPitch) * cosRoll) + ((sinYaw * cosPitch) * sinRoll);
    result.Y = ((sinYaw * cosPitch) * cosRoll) - ((cosYaw * sinPitch) * sinRoll);
    result.Z = ((cosYaw * cosPitch) * sinRoll) - ((sinYaw * sinPitch) * cosRoll);
    result.W = ((cosYaw * cosPitch) * cosRoll) + ((sinYaw * sinPitch) * sinRoll);
    return result;
  }

  /// <summary>
  /// Divides a <see cref="Quaternion"/> by the other <see cref="Quaternion"/>.
  /// </summary>
  /// <param name="quaternion1">Source <see cref="Quaternion"/>.</param>
  /// <param name="quaternion2">Divisor <see cref="Quaternion"/>.</param>
  /// <param name="result">The result of dividing the quaternions as an output parameter.</param>
  /*public*/ static /*void*/ Divide(
    /*ref*/ /*Quaternion*/ quaternion1,
    /*ref*/ /*Quaternion*/ quaternion2,
    /*out*/ /*Quaternion*/ result = new CQuaternion()
  ) {
    /*float*/ var x = quaternion1.X;
    /*float*/ var y = quaternion1.Y;
    /*float*/ var z = quaternion1.Z;
    /*float*/ var w = quaternion1.W;
    /*float*/ var num14 = (
      (quaternion2.X * quaternion2.X) +
      (quaternion2.Y * quaternion2.Y) +
      (quaternion2.Z * quaternion2.Z) +
      (quaternion2.W * quaternion2.W)
    );
    /*float*/ var num5 = 1 / num14;
    /*float*/ var num4 = -quaternion2.X * num5;
    /*float*/ var num3 = -quaternion2.Y * num5;
    /*float*/ var num2 = -quaternion2.Z * num5;
    /*float*/ var num = quaternion2.W * num5;
    /*float*/ var num13 = (y * num2) - (z * num3);
    /*float*/ var num12 = (z * num4) - (x * num2);
    /*float*/ var num11 = (x * num3) - (y * num4);
    /*float*/ var num10 = ((x * num4) + (y * num3)) + (z * num2);
    result.X = ((x * num) + (num4 * w)) + num13;
    result.Y = ((y * num) + (num3 * w)) + num12;
    result.Z = ((z * num) + (num2 * w)) + num11;
    result.W = (w * num) - num10;
    return result;
  }

  /// <summary>
  /// Returns a dot product of two quaternions.
  /// </summary>
  /// <param name="quaternion1">The first quaternion.</param>
  /// <param name="quaternion2">The second quaternion.</param>
  /// <returns>The dot product of two quaternions.</returns>
  /*public*/ static /*float*/ Dot(/*Quaternion*/ quaternion1, /*Quaternion*/ quaternion2)
  {
    return (
      (quaternion1.X * quaternion2.X) +
      (quaternion1.Y * quaternion2.Y) +
      (quaternion1.Z * quaternion2.Z) +
      (quaternion1.W * quaternion2.W)
    );
  }

  /// <summary>
  /// Returns the inverse quaternion which represents the opposite rotation.
  /// </summary>
  /// <param name="quaternion">Source <see cref="Quaternion"/>.</param>
  /// <param name="result">The inverse quaternion as an output parameter.</param>
  /*public*/ static /*void*/ Inverse(/*ref*/ /*Quaternion*/ quaternion, /*out*/ /*Quaternion*/ result = new CQuaternion())
  {
    /*float*/ var num2 = (
      (quaternion.X * quaternion.X) +
      (quaternion.Y * quaternion.Y) +
      (quaternion.Z * quaternion.Z) +
      (quaternion.W * quaternion.W)
    );
    /*float*/ var num = 1 / num2;
    result.X = -quaternion.X * num;
    result.Y = -quaternion.Y * num;
    result.Z = -quaternion.Z * num;
    result.W = quaternion.W * num;
    return result;
  }

  /// <summary>
  /// Performs a linear blend between two quaternions.
  /// </summary>
  /// <param name="quaternion1">Source <see cref="Quaternion"/>.</param>
  /// <param name="quaternion2">Source <see cref="Quaternion"/>.</param>
  /// <param name="amount">The blend amount where 0 returns <paramref name="quaternion1"/> and 1 <paramref name="quaternion2"/>.</param>
  /// <param name="result">The result of linear blending between two quaternions as an output parameter.</param>
  /*public*/ static /*void*/ Lerp(
    /*ref*/ /*Quaternion*/ quaternion1,
    /*ref*/ /*Quaternion*/ quaternion2,
    /*float*/ amount,
    /*out*/ /*Quaternion*/ result = new CQuaternion()
  ) {
    /*float*/ var num = amount;
    /*float*/ var num2 = 1 - num;
    /*float*/ var num5 = (
      (quaternion1.X * quaternion2.X) +
      (quaternion1.Y * quaternion2.Y) +
      (quaternion1.Z * quaternion2.Z) +
      (quaternion1.W * quaternion2.W)
    );
    if (num5 >= 0)
    {
      result.X = (num2 * quaternion1.X) + (num * quaternion2.X);
      result.Y = (num2 * quaternion1.Y) + (num * quaternion2.Y);
      result.Z = (num2 * quaternion1.Z) + (num * quaternion2.Z);
      result.W = (num2 * quaternion1.W) + (num * quaternion2.W);
    }
    else
    {
      result.X = (num2 * quaternion1.X) - (num * quaternion2.X);
      result.Y = (num2 * quaternion1.Y) - (num * quaternion2.Y);
      result.Z = (num2 * quaternion1.Z) - (num * quaternion2.Z);
      result.W = (num2 * quaternion1.W) - (num * quaternion2.W);
    }
    /*float*/ var num4 = (
      (result.X * result.X) +
      (result.Y * result.Y) +
      (result.Z * result.Z) +
      (result.W * result.W)
    );
    /*float*/ var num3 = 1 / (/*(float)*/ CMath.Sqrt(/*(double)*/ num4));
    result.X *= num3;
    result.Y *= num3;
    result.Z *= num3;
    result.W *= num3;
    return result;
  }

  /// <summary>
  /// Performs a spherical linear blend between two quaternions.
  /// </summary>
  /// <param name="quaternion1">Source <see cref="Quaternion"/>.</param>
  /// <param name="quaternion2">Source <see cref="Quaternion"/>.</param>
  /// <param name="amount">The blend amount where 0 returns <paramref name="quaternion1"/> and 1 <paramref name="quaternion2"/>.</param>
  /// <param name="result">The result of spherical linear blending between two quaternions as an output parameter.</param>
  /*public*/ static /*void*/ Slerp(
    /*ref*/ /*Quaternion*/ quaternion1,
    /*ref*/ /*Quaternion*/ quaternion2,
    /*float*/ amount,
    /*out*/ /*Quaternion*/ result = new CQuaternion()
  ) {
    /*float*/ var num2;
    /*float*/ var num3;
    /*float*/ var num = amount;
    /*float*/ var num4 = (
      (quaternion1.X * quaternion2.X) +
      (quaternion1.Y * quaternion2.Y) +
      (quaternion1.Z * quaternion2.Z) +
      (quaternion1.W * quaternion2.W)
    );
    /*float*/ var flag = 1.0;
    if (num4 < 0)
    {
      flag = -1.0;
      num4 = -num4;
    }
    if (num4 > 0.999999)
    {
      num3 = 1 - num;
      num2 = num * flag;
    }
    else
    {
      /*float*/ var num5 = /*(float)*/ CMath.Acos(/*(double)*/ num4);
      /*float*/ var num6 = /*(float)*/ (1.0 / CMath.Sin(/*(double)*/ num5));
      num3 = (/*(float)*/ CMath.Sin(/*(double)*/ ((1 - num) * num5))) * num6;
      num2 = flag * ((/*(float)*/ CMath.Sin(/*(double)*/ (num * num5))) * num6);
    }
    result.X = (num3 * quaternion1.X) + (num2 * quaternion2.X);
    result.Y = (num3 * quaternion1.Y) + (num2 * quaternion2.Y);
    result.Z = (num3 * quaternion1.Z) + (num2 * quaternion2.Z);
    result.W = (num3 * quaternion1.W) + (num2 * quaternion2.W);
    return result;
  }

};

CMatrix = class CMatrix {
  //#region Public Properties

  /// <summary>
  /// The backward vector formed from the third row M31, M32, M33 elements.
  /// </summary>
  /*public*/ /*Vector3*/ get Backward()
  {
    return new CVector3(this.M31, this.M32, this.M33);
  }
  /*public*/ /*Vector3*/ set Backward(/*Vector3*/ value)
  {
    this.M31 = value.X;
    this.M32 = value.Y;
    this.M33 = value.Z;
  }

  /// <summary>
  /// The down vector formed from the second row -M21, -M22, -M23 elements.
  /// </summary>
  /*public*/ /*Vector3*/ get Down()
  {
    return new CVector3(-this.M21, -this.M22, -this.M23);
  }
  /*public*/ /*Vector3*/ set Down(/*Vector3*/ value)
  {
    this.M21 = -value.X;
    this.M22 = -value.Y;
    this.M23 = -value.Z;
  }

  /// <summary>
  /// The forward vector formed from the third row -M31, -M32, -M33 elements.
  /// </summary>
  /*public*/ /*Vector3*/ get Forward()
  {
    return new CVector3(-this.M31, -this.M32, -this.M33);
  }
  /*public*/ /*Vector3*/ set Forward(/*Vector3*/ value)
  {
    this.M31 = -value.X;
    this.M32 = -value.Y;
    this.M33 = -value.Z;
  }

  /// <summary>
  /// Returns the identity matrix.
  /// </summary>
  /*public*/ static /*Matrix*/ get Identity()
  {
    return CMatrix.identity;
  }

  /// <summary>
  /// The left vector formed from the first row -M11, -M12, -M13 elements.
  /// </summary>
  /*public*/ /*Vector3*/ get Left()
  {
    return new CVector3(-this.M11, -this.M12, -this.M13);
  }
  /*public*/ /*Vector3*/ set Left(/*Vector3*/ value)
  {
    this.M11 = -value.X;
    this.M12 = -value.Y;
    this.M13 = -value.Z;
  }

  /// <summary>
  /// The right vector formed from the first row M11, M12, M13 elements.
  /// </summary>
  /*public*/ /*Vector3*/ get Right()
  {
    return new CVector3(this.M11, this.M12, this.M13);
  }
  /*public*/ /*Vector3*/ set Right(/*Vector3*/ value)
  {
    this.M11 = value.X;
    this.M12 = value.Y;
    this.M13 = value.Z;
  }

  /// <summary>
  /// Position stored in this matrix.
  /// </summary>
  /*public*/ /*Vector3*/ get Translation()
  {
    return new CVector3(this.M41, this.M42, this.M43);
  }
  /*public*/ /*Vector3*/ set Translation(/*Vector3*/ value)
  {
    this.M41 = value.X;
    this.M42 = value.Y;
    this.M43 = value.Z;
  }

  /// <summary>
  /// The upper vector formed from the second row M21, M22, M23 elements.
  /// </summary>
  /*public*/ /*Vector3*/ get Up()
  {
    return new CVector3(this.M21, this.M22, this.M23);
  }
  /*public*/ /*Vector3*/ set Up(/*Vector3*/ value)
  {
    this.M21 = value.X;
    this.M22 = value.Y;
    this.M23 = value.Z;
  }

  //#endregion

  //#region Public Constructors

  /// <summary>
  /// Constructs a matrix.
  /// </summary>
  /// <param name="m11">A first row and first column value.</param>
  /// <param name="m12">A first row and second column value.</param>
  /// <param name="m13">A first row and third column value.</param>
  /// <param name="m14">A first row and fourth column value.</param>
  /// <param name="m21">A second row and first column value.</param>
  /// <param name="m22">A second row and second column value.</param>
  /// <param name="m23">A second row and third column value.</param>
  /// <param name="m24">A second row and fourth column value.</param>
  /// <param name="m31">A third row and first column value.</param>
  /// <param name="m32">A third row and second column value.</param>
  /// <param name="m33">A third row and third column value.</param>
  /// <param name="m34">A third row and fourth column value.</param>
  /// <param name="m41">A fourth row and first column value.</param>
  /// <param name="m42">A fourth row and second column value.</param>
  /// <param name="m43">A fourth row and third column value.</param>
  /// <param name="m44">A fourth row and fourth column value.</param>
  /*public*/ constructor(
    /*float*/ m11 = 1, /*float*/ m12 = 0, /*float*/ m13 = 0, /*float*/ m14 = 0,
    /*float*/ m21 = 0, /*float*/ m22 = 1, /*float*/ m23 = 0, /*float*/ m24 = 0,
    /*float*/ m31 = 0, /*float*/ m32 = 0, /*float*/ m33 = 1, /*float*/ m34 = 0,
    /*float*/ m41 = 0, /*float*/ m42 = 0, /*float*/ m43 = 0, /*float*/ m44 = 1,
  ) {
    this.M11 = m11;
    this.M12 = m12;
    this.M13 = m13;
    this.M14 = m14;
    this.M21 = m21;
    this.M22 = m22;
    this.M23 = m23;
    this.M24 = m24;
    this.M31 = m31;
    this.M32 = m32;
    this.M33 = m33;
    this.M34 = m34;
    this.M41 = m41;
    this.M42 = m42;
    this.M43 = m43;
    this.M44 = m44;
  }

  static Assign(dst, src) {
    dst.M11 = src.M11;
    dst.M12 = src.M12;
    dst.M13 = src.M13;
    dst.M14 = src.M14;
    dst.M21 = src.M21;
    dst.M22 = src.M22;
    dst.M23 = src.M23;
    dst.M24 = src.M24;
    dst.M31 = src.M31;
    dst.M32 = src.M32;
    dst.M33 = src.M33;
    dst.M34 = src.M34;
    dst.M41 = src.M41;
    dst.M42 = src.M42;
    dst.M43 = src.M43;
    dst.M44 = src.M44;
  }

  //#endregion


  /// <summary>
  /// Decomposes this matrix to translation, rotation and scale elements. Returns <c>true</c> if matrix can be decomposed; <c>false</c> otherwise.
  /// </summary>
  /// <param name="scale">Scale vector as an output parameter.</param>
  /// <param name="rotation">Rotation quaternion as an output parameter.</param>
  /// <param name="translation">Translation vector as an output parameter.</param>
  /// <returns><c>true</c> if matrix can be decomposed; <c>false</c> otherwise.</returns>
  /*public*/ /*bool*/ Decompose(
    /*out*/ /*Vector3*/ scale = new CVector3(1,1,1),
    /*out*/ /*Quaternion*/ rotation = new CQuaternion(),
    /*out*/ /*Vector3*/ translation = new CVector3(0,0,0),
  ) {
    translation.X = this.M41;
    translation.Y = this.M42;
    translation.Z = this.M43;

    /*float*/ var xs = (CMath.Sign(this.M11 * this.M12 * this.M13 * this.M14) < 0) ? -1 : 1;
    /*float*/ var ys = (CMath.Sign(this.M21 * this.M22 * this.M23 * this.M24) < 0) ? -1 : 1;
    /*float*/ var zs = (CMath.Sign(this.M31 * this.M32 * this.M33 * this.M34) < 0) ? -1 : 1;

    scale.X = xs * /*(float)*/ CMath.Sqrt(this.M11 * this.M11 + this.M12 * this.M12 + this.M13 * this.M13);
    scale.Y = ys * /*(float)*/ CMath.Sqrt(this.M21 * this.M21 + this.M22 * this.M22 + this.M23 * this.M23);
    scale.Z = zs * /*(float)*/ CMath.Sqrt(this.M31 * this.M31 + this.M32 * this.M32 + this.M33 * this.M33);

    if (CMathHelper.WithinEpsilon(scale.X, 0.0) ||
        CMathHelper.WithinEpsilon(scale.Y, 0.0) ||
        CMathHelper.WithinEpsilon(scale.Z, 0.0)	)
    {
      CQuaternion.Assign(rotation, CQuaternion.Identity);
      return false;
    }

    /*Matrix*/ var m1 = new CMatrix(
      this.M11 / scale.X, this.M12 / scale.X, this.M13 / scale.X, 0,
      this.M21 / scale.Y, this.M22 / scale.Y, this.M23 / scale.Y, 0,
      this.M31 / scale.Z, this.M32 / scale.Z, this.M33 / scale.Z, 0,
      0, 0, 0, 1
    );

    CQuaternion.CreateFromRotationMatrix(m1, rotation);
    return {scale, rotation, translation};
  }

  /// <summary>
  /// Returns a determinant of this <see cref="Matrix"/>.
  /// </summary>
  /// <returns>Determinant of this <see cref="Matrix"/></returns>
  /// <remarks>See more about determinant here - http://en.wikipedia.org/wiki/Determinant.
  /// </remarks>
  /*public*/ /*float*/ Determinant()
  {
    /*float*/ var num18 = (this.M33 * this.M44) - (this.M34 * this.M43);
    /*float*/ var num17 = (this.M32 * this.M44) - (this.M34 * this.M42);
    /*float*/ var num16 = (this.M32 * this.M43) - (this.M33 * this.M42);
    /*float*/ var num15 = (this.M31 * this.M44) - (this.M34 * this.M41);
    /*float*/ var num14 = (this.M31 * this.M43) - (this.M33 * this.M41);
    /*float*/ var num13 = (this.M31 * this.M42) - (this.M32 * this.M41);
    return (
      (
        (
          (this.M11 * (((this.M22 * num18) - (this.M23 * num17)) + (this.M24 * num16))) -
          (this.M12 * (((this.M21 * num18) - (this.M23 * num15)) + (this.M24 * num14)))
        ) + (this.M13 * (((this.M21 * num17) - (this.M22 * num15)) + (this.M24 * num13)))
      ) - (this.M14 * (((this.M21 * num16) - (this.M22 * num14)) + (this.M23 * num13)))
    );
  }

  /// <summary>
  /// Compares whether current instance is equal to specified <see cref="Matrix"/> without any tolerance.
  /// </summary>
  /// <param name="other">The <see cref="Matrix"/> to compare.</param>
  /// <returns><c>true</c> if the instances are equal; <c>false</c> otherwise.</returns>
  /*public*/ /*bool*/ Equals(/*Matrix*/ other)
  {
    return (	this.M11 === other.M11 &&
        this.M12 === other.M12 &&
        this.M13 === other.M13 &&
        this.M14 === other.M14 &&
        this.M21 === other.M21 &&
        this.M22 === other.M22 &&
        this.M23 === other.M23 &&
        this.M24 === other.M24 &&
        this.M31 === other.M31 &&
        this.M32 === other.M32 &&
        this.M33 === other.M33 &&
        this.M34 === other.M34 &&
        this.M41 === other.M41 &&
        this.M42 === other.M42 &&
        this.M43 === other.M43 &&
        this.M44 === other.M44	);
  }

  /// <summary>
  /// Creates a new <see cref="Matrix"/> which contains the rotation moment around specified axis.
  /// </summary>
  /// <param name="axis">The axis of rotation.</param>
  /// <param name="angle">The angle of rotation in radians.</param>
  /// <param name="result">The rotation <see cref="Matrix"/> as an output parameter.</param>
  /*public*/ static /*void*/ CreateFromAxisAngle(
    /*ref*/ /*Vector3*/ axis,
    /*float*/ angle,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    /*float*/ var x = axis.X;
    /*float*/ var y = axis.Y;
    /*float*/ var z = axis.Z;
    /*float*/ var num2 = /*(float)*/ CMath.Sin(/*(double)*/ angle);
    /*float*/ var num = /*(float)*/ CMath.Cos(/*(double)*/ angle);
    /*float*/ var num11 = x * x;
    /*float*/ var num10 = y * y;
    /*float*/ var num9 = z * z;
    /*float*/ var num8 = x * y;
    /*float*/ var num7 = x * z;
    /*float*/ var num6 = y * z;
    result.M11 = num11 + (num * (1 - num11));
    result.M12 = (num8 - (num * num8)) + (num2 * z);
    result.M13 = (num7 - (num * num7)) - (num2 * y);
    result.M14 = 0;
    result.M21 = (num8 - (num * num8)) - (num2 * z);
    result.M22 = num10 + (num * (1 - num10));
    result.M23 = (num6 - (num * num6)) + (num2 * x);
    result.M24 = 0;
    result.M31 = (num7 - (num * num7)) + (num2 * y);
    result.M32 = (num6 - (num * num6)) - (num2 * x);
    result.M33 = num9 + (num * (1 - num9));
    result.M34 = 0;
    result.M41 = 0;
    result.M42 = 0;
    result.M43 = 0;
    result.M44 = 1;
    return result;
  }

  /// <summary>
  /// Creates a new rotation <see cref="Matrix"/> from a <see cref="Quaternion"/>.
  /// </summary>
  /// <param name="quaternion"><see cref="Quaternion"/> of rotation moment.</param>
  /// <param name="result">The rotation <see cref="Matrix"/> as an output parameter.</param>
  /*public*/ static /*void*/ CreateFromQuaternion(/*ref*/ /*Quaternion*/ quaternion, /*out*/ /*Matrix*/ result = new CMatrix())
  {
    /*float*/ var num9 = quaternion.X * quaternion.X;
    /*float*/ var num8 = quaternion.Y * quaternion.Y;
    /*float*/ var num7 = quaternion.Z * quaternion.Z;
    /*float*/ var num6 = quaternion.X * quaternion.Y;
    /*float*/ var num5 = quaternion.Z * quaternion.W;
    /*float*/ var num4 = quaternion.Z * quaternion.X;
    /*float*/ var num3 = quaternion.Y * quaternion.W;
    /*float*/ var num2 = quaternion.Y * quaternion.Z;
    /*float*/ var num = quaternion.X * quaternion.W;
    result.M11 = 1 - (2 * (num8 + num7));
    result.M12 = 2 * (num6 + num5);
    result.M13 = 2 * (num4 - num3);
    result.M14 = 0;
    result.M21 = 2 * (num6 - num5);
    result.M22 = 1 - (2 * (num7 + num9));
    result.M23 = 2 * (num2 + num);
    result.M24 = 0;
    result.M31 = 2 * (num4 + num3);
    result.M32 = 2 * (num2 - num);
    result.M33 = 1 - (2 * (num8 + num9));
    result.M34 = 0;
    result.M41 = 0;
    result.M42 = 0;
    result.M43 = 0;
    result.M44 = 1;
    return result;
  }

  /// <summary>
  /// Creates a new rotation <see cref="Matrix"/> from the specified yaw, pitch and roll values.
  /// </summary>
  /// <param name="yaw">The yaw rotation value in radians.</param>
  /// <param name="pitch">The pitch rotation value in radians.</param>
  /// <param name="roll">The roll rotation value in radians.</param>
  /// <param name="result">The rotation <see cref="Matrix"/> as an output parameter.</param>
  /// <remarks>For more information about yaw, pitch and roll visit http://en.wikipedia.org/wiki/Euler_angles.
  /// </remarks>
  /*public*/ static /*void*/ CreateFromYawPitchRoll(
    /*float*/ yaw,
    /*float*/ pitch,
    /*float*/ roll,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    /*Quaternion*/ var quaternion = new CQuaternion();
    CQuaternion.CreateFromYawPitchRoll(yaw, pitch, roll, /*out*/ quaternion);
    CMatrix.CreateFromQuaternion(/*ref*/ quaternion, /*out*/ result);
    return result;
  }

  /// <summary>
  /// Creates a new viewing <see cref="Matrix"/>.
  /// </summary>
  /// <param name="cameraPosition">Position of the camera.</param>
  /// <param name="cameraTarget">Lookup vector of the camera.</param>
  /// <param name="cameraUpVector">The direction of the upper edge of the camera.</param>
  /// <param name="result">The viewing <see cref="Matrix"/> as an output parameter.</param>
  /*public*/ static /*void*/ CreateLookAt(
    /*ref*/ /*Vector3*/ cameraPosition,
    /*ref*/ /*Vector3*/ cameraTarget,
    /*ref*/ /*Vector3*/ cameraUpVector,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    /*Vector3*/ var vectorA = CVector3.Normalize(CVector3.Subtract(cameraPosition, cameraTarget));
    /*Vector3*/ var vectorB = CVector3.Normalize(CVector3.Cross(cameraUpVector, vectorA));
    /*Vector3*/ var vectorC = CVector3.Cross(vectorA, vectorB);
    result.M11 = vectorB.X;
    result.M12 = vectorC.X;
    result.M13 = vectorA.X;
    result.M14 = 0;
    result.M21 = vectorB.Y;
    result.M22 = vectorC.Y;
    result.M23 = vectorA.Y;
    result.M24 = 0;
    result.M31 = vectorB.Z;
    result.M32 = vectorC.Z;
    result.M33 = vectorA.Z;
    result.M34 = 0;
    result.M41 = -CVector3.Dot(vectorB, cameraPosition);
    result.M42 = -CVector3.Dot(vectorC, cameraPosition);
    result.M43 = -CVector3.Dot(vectorA, cameraPosition);
    result.M44 = 1;
    return result;
  }

  /// <summary>
  /// Creates a new projection <see cref="Matrix"/> for orthographic view.
  /// </summary>
  /// <param name="width">Width of the viewing volume.</param>
  /// <param name="height">Height of the viewing volume.</param>
  /// <param name="zNearPlane">Depth of the near plane.</param>
  /// <param name="zFarPlane">Depth of the far plane.</param>
  /// <param name="result">The new projection <see cref="Matrix"/> for orthographic view as an output parameter.</param>
  /*public*/ static /*void*/ CreateOrthographic(
    /*float*/ width,
    /*float*/ height,
    /*float*/ zNearPlane,
    /*float*/ zFarPlane,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    result.M11 = 2 / width;
    result.M12 = result.M13 = result.M14 = 0;
    result.M22 = 2 / height;
    result.M21 = result.M23 = result.M24 = 0;
    result.M33 = 1 / (zNearPlane - zFarPlane);
    result.M31 = result.M32 = result.M34 = 0;
    result.M41 = result.M42 = 0;
    result.M43 = zNearPlane / (zNearPlane - zFarPlane);
    result.M44 = 1;
    return result;
  }

  /// <summary>
  /// Creates a new projection <see cref="Matrix"/> for customized orthographic view.
  /// </summary>
  /// <param name="left">Lower x-value at the near plane.</param>
  /// <param name="right">Upper x-value at the near plane.</param>
  /// <param name="bottom">Lower y-coordinate at the near plane.</param>
  /// <param name="top">Upper y-value at the near plane.</param>
  /// <param name="zNearPlane">Depth of the near plane.</param>
  /// <param name="zFarPlane">Depth of the far plane.</param>
  /// <param name="result">The new projection <see cref="Matrix"/> for customized orthographic view as an output parameter.</param>
  /*public*/ static /*void*/ CreateOrthographicOffCenter(
    /*float*/ left,
    /*float*/ right,
    /*float*/ bottom,
    /*float*/ top,
    /*float*/ zNearPlane,
    /*float*/ zFarPlane,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    result.M11 = /*(float)*/ (2.0 / (/*(double)*/ right - /*(double)*/ left));
    result.M12 = 0.0;
    result.M13 = 0.0;
    result.M14 = 0.0;
    result.M21 = 0.0;
    result.M22 = /*(float)*/ (2.0 / (/*(double)*/ top - /*(double)*/ bottom));
    result.M23 = 0.0;
    result.M24 = 0.0;
    result.M31 = 0.0;
    result.M32 = 0.0;
    result.M33 = /*(float)*/ (1.0 / (/*(double)*/ zNearPlane - /*(double)*/ zFarPlane));
    result.M34 = 0.0;
    result.M41 = /*(float)*/ (
      (/*(double)*/ left + /*(double)*/ right) /
      (/*(double)*/ left - /*(double)*/ right)
    );
    result.M42 = /*(float)*/ (
      (/*(double)*/ top + /*(double)*/ bottom) /
      (/*(double)*/ bottom - /*(double)*/ top)
    );
    result.M43 = /*(float)*/ (
      /*(double)*/ zNearPlane /
      (/*(double)*/ zNearPlane - /*(double)*/ zFarPlane)
    );
    result.M44 = 1.0;
    return result;
  }


  /// <summary>
  /// Creates a new projection <see cref="Matrix"/> for perspective view.
  /// </summary>
  /// <param name="width">Width of the viewing volume.</param>
  /// <param name="height">Height of the viewing volume.</param>
  /// <param name="nearPlaneDistance">Distance to the near plane.</param>
  /// <param name="farPlaneDistance">Distance to the far plane.</param>
  /// <param name="result">The new projection <see cref="Matrix"/> for perspective view as an output parameter.</param>
  /*public*/ static /*void*/ CreatePerspective(
    /*float*/ width,
    /*float*/ height,
    /*float*/ nearPlaneDistance,
    /*float*/ farPlaneDistance,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    if (nearPlaneDistance <= 0)
    {
      throw new CArgumentException("nearPlaneDistance <= 0");
    }
    if (farPlaneDistance <= 0)
    {
      throw new CArgumentException("farPlaneDistance <= 0");
    }
    if (nearPlaneDistance >= farPlaneDistance)
    {
      throw new CArgumentException("nearPlaneDistance >= farPlaneDistance");
    }
    result.M11 = (2 * nearPlaneDistance) / width;
    result.M12 = result.M13 = result.M14 = 0;
    result.M22 = (2 * nearPlaneDistance) / height;
    result.M21 = result.M23 = result.M24 = 0;
    result.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
    result.M31 = result.M32 = 0;
    result.M34 = -1;
    result.M41 = result.M42 = result.M44 = 0;
    result.M43 = (
      (nearPlaneDistance * farPlaneDistance) /
      (nearPlaneDistance - farPlaneDistance)
    );
    return result;
  }

  /// <summary>
  /// Creates a new projection <see cref="Matrix"/> for perspective view with field of view.
  /// </summary>
  /// <param name="fieldOfView">Field of view in the y direction in radians.</param>
  /// <param name="aspectRatio">Width divided by height of the viewing volume.</param>
  /// <param name="nearPlaneDistance">Distance of the near plane.</param>
  /// <param name="farPlaneDistance">Distance of the far plane.</param>
  /// <param name="result">The new projection <see cref="Matrix"/> for perspective view with FOV as an output parameter.</param>
  /*public*/ static /*void*/ CreatePerspectiveFieldOfView(
    /*float*/ fieldOfView,
    /*float*/ aspectRatio,
    /*float*/ nearPlaneDistance,
    /*float*/ farPlaneDistance,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    if ((fieldOfView <= 0) || (fieldOfView >= 3.141593))
    {
      throw new CArgumentException("fieldOfView <= 0 or >= PI");
    }
    if (nearPlaneDistance <= 0)
    {
      throw new CArgumentException("nearPlaneDistance <= 0");
    }
    if (farPlaneDistance <= 0)
    {
      throw new CArgumentException("farPlaneDistance <= 0");
    }
    if (nearPlaneDistance >= farPlaneDistance)
    {
      throw new CArgumentException("nearPlaneDistance >= farPlaneDistance");
    }
    /*float*/ var num = 1 / (/*(float)*/ CMath.Tan(/*(double)*/ (fieldOfView * 0.5)));
    /*float*/ var num9 = num / aspectRatio;
    result.M11 = num9;
    result.M12 = result.M13 = result.M14 = 0;
    result.M22 = num;
    result.M21 = result.M23 = result.M24 = 0;
    result.M31 = result.M32 = 0;
    result.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
    result.M34 = -1;
    result.M41 = result.M42 = result.M44 = 0;
    result.M43 = (
      (nearPlaneDistance * farPlaneDistance) /
      (nearPlaneDistance - farPlaneDistance)
    );
    return result;
  }

  /// <summary>
  /// Creates a new projection <see cref="Matrix"/> for customized perspective view.
  /// </summary>
  /// <param name="left">Lower x-value at the near plane.</param>
  /// <param name="right">Upper x-value at the near plane.</param>
  /// <param name="bottom">Lower y-coordinate at the near plane.</param>
  /// <param name="top">Upper y-value at the near plane.</param>
  /// <param name="nearPlaneDistance">Distance to the near plane.</param>
  /// <param name="farPlaneDistance">Distance to the far plane.</param>
  /// <param name="result">The new <see cref="Matrix"/> for customized perspective view as an output parameter.</param>
  /*public*/ static /*void*/ CreatePerspectiveOffCenter(
    /*float*/ left,
    /*float*/ right,
    /*float*/ bottom,
    /*float*/ top,
    /*float*/ nearPlaneDistance,
    /*float*/ farPlaneDistance,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    if (nearPlaneDistance <= 0)
    {
      throw new CArgumentException("nearPlaneDistance <= 0");
    }
    if (farPlaneDistance <= 0)
    {
      throw new CArgumentException("farPlaneDistance <= 0");
    }
    if (nearPlaneDistance >= farPlaneDistance)
    {
      throw new CArgumentException("nearPlaneDistance >= farPlaneDistance");
    }
    result.M11 = (2 * nearPlaneDistance) / (right - left);
    result.M12 = result.M13 = result.M14 = 0;
    result.M22 = (2 * nearPlaneDistance) / (top - bottom);
    result.M21 = result.M23 = result.M24 = 0;
    result.M31 = (left + right) / (right - left);
    result.M32 = (top + bottom) / (top - bottom);
    result.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
    result.M34 = -1;
    result.M43 = (
      (nearPlaneDistance * farPlaneDistance) /
      (nearPlaneDistance - farPlaneDistance)
    );
    result.M41 = result.M42 = result.M44 = 0;
    return result;
  }

  /// <summary>
  /// Creates a new rotation <see cref="Matrix"/> around X axis.
  /// </summary>
  /// <param name="radians">Angle in radians.</param>
  /// <param name="result">The rotation <see cref="Matrix"/> around X axis as an output parameter.</param>
  /*public*/ static /*void*/ CreateRotationX(/*float*/ radians, /*out*/ /*Matrix*/ result = new CMatrix())
  {
    CMatrix.Assign(result, CMatrix.Identity);

    /*float*/ var val1 = /*(float)*/ CMath.Cos(radians);
    /*float*/ var val2 = /*(float)*/ CMath.Sin(radians);

    result.M22 = val1;
    result.M23 = val2;
    result.M32 = -val2;
    result.M33 = val1;
    return result;
  }

  /// <summary>
  /// Creates a new rotation <see cref="Matrix"/> around Y axis.
  /// </summary>
  /// <param name="radians">Angle in radians.</param>
  /// <param name="result">The rotation <see cref="Matrix"/> around Y axis as an output parameter.</param>
  /*public*/ static /*void*/ CreateRotationY(/*float*/ radians, /*out*/ /*Matrix*/ result = new CMatrix())
  {
    CMatrix.Assign(result, CMatrix.Identity);

    /*float*/ var val1 = /*(float)*/ CMath.Cos(radians);
    /*float*/ var val2 = /*(float)*/ CMath.Sin(radians);

    result.M11 = val1;
    result.M13 = -val2;
    result.M31 = val2;
    result.M33 = val1;
    return result;
  }

  /// <summary>
  /// Creates a new rotation <see cref="Matrix"/> around Z axis.
  /// </summary>
  /// <param name="radians">Angle in radians.</param>
  /// <param name="result">The rotation <see cref="Matrix"/> around Z axis as an output parameter.</param>
  /*public*/ static /*void*/ CreateRotationZ(/*float*/ radians, /*out*/ /*Matrix*/ result = new CMatrix())
  {
    CMatrix.assign(result, CMatrix.Identity);

    /*float*/ var val1 = /*(float)*/ CMath.Cos(radians);
    /*float*/ var val2 = /*(float)*/ CMath.Sin(radians);

    result.M11 = val1;
    result.M12 = val2;
    result.M21 = -val2;
    result.M22 = val1;
    return result;
  }

  /// <summary>
  /// Creates a new scaling <see cref="Matrix"/>.
  /// </summary>
  /// <param name="xScale">Scale value for X axis.</param>
  /// <param name="yScale">Scale value for Y axis.</param>
  /// <param name="zScale">Scale value for Z axis.</param>
  /// <param name="result">The scaling <see cref="Matrix"/> as an output parameter.</param>
  /*public*/ static /*void*/ CreateScale(
    /*float*/ xScale,
    /*float*/ yScale,
    /*float*/ zScale,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    result.M11 = xScale;
    result.M12 = 0;
    result.M13 = 0;
    result.M14 = 0;
    result.M21 = 0;
    result.M22 = yScale;
    result.M23 = 0;
    result.M24 = 0;
    result.M31 = 0;
    result.M32 = 0;
    result.M33 = zScale;
    result.M34 = 0;
    result.M41 = 0;
    result.M42 = 0;
    result.M43 = 0;
    result.M44 = 1;
    return result;
  }

  /// <summary>
  /// Creates a new translation <see cref="Matrix"/>.
  /// </summary>
  /// <param name="xPosition">X coordinate of translation.</param>
  /// <param name="yPosition">Y coordinate of translation.</param>
  /// <param name="zPosition">Z coordinate of translation.</param>
  /// <param name="result">The translation <see cref="Matrix"/> as an output parameter.</param>
  /*public*/ static /*void*/ CreateTranslation(
    /*float*/ xPosition,
    /*float*/ yPosition,
    /*float*/ zPosition,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    result.M11 = 1;
    result.M12 = 0;
    result.M13 = 0;
    result.M14 = 0;
    result.M21 = 0;
    result.M22 = 1;
    result.M23 = 0;
    result.M24 = 0;
    result.M31 = 0;
    result.M32 = 0;
    result.M33 = 1;
    result.M34 = 0;
    result.M41 = xPosition;
    result.M42 = yPosition;
    result.M43 = zPosition;
    result.M44 = 1;
    return result;
  }

  /// <summary>
  /// Creates a new world <see cref="Matrix"/>.
  /// </summary>
  /// <param name="position">The position vector.</param>
  /// <param name="forward">The forward direction vector.</param>
  /// <param name="up">The upward direction vector. Usually <see cref="Vector3.Up"/>.</param>
  /// <param name="result">The world <see cref="Matrix"/> as an output parameter.</param>
  /*public*/ static /*void*/ CreateWorld(
    /*ref*/ /*Vector3*/ position,
    /*ref*/ /*Vector3*/ forward,
    /*ref*/ /*Vector3*/ up,
    /*out*/ /*Matrix*/ result = new CMatrix()
  ) {
    /*Vector3*/ var x = new CVector3(), y = new CVector3(), z = new CVector3();
    CVector3.Normalize(/*ref*/ forward, /*out*/ z);
    CVector3.Cross(/*ref*/ forward, /*ref*/ up, /*out*/ x);
    CVector3.Cross(/*ref*/ x, /*ref*/ forward, /*out*/ y);
    x.Normalize();
    y.Normalize();

    CMatrix.Assign(result, new CMatrix());
    result.Right = x;
    result.Up = y;
    result.Forward = z;
    result.Translation = position;
    result.M44 = 1;
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Matrix"/> which contains inversion of the specified matrix.
  /// </summary>
  /// <param name="matrix">Source <see cref="Matrix"/>.</param>
  /// <param name="result">The inverted matrix as output parameter.</param>
  /*public*/ static /*void*/ Invert(/*ref*/ /*Matrix*/ matrix, /*out*/ /*Matrix*/ result = new CMatrix())
  {
    /*
     * Use Laplace expansion theorem to calculate the inverse of a 4x4 matrix.
     *
     * 1. Calculate the 2x2 determinants needed the 4x4 determinant based on
     *    the 2x2 determinants.
     * 3. Create the adjugate matrix, which satisfies: A * adj(A) = det(A) * I.
     * 4. Divide adjugate matrix with the determinant to find the inverse.
     */

    /*float*/ var num1 = matrix.M11;
    /*float*/ var num2 = matrix.M12;
    /*float*/ var num3 = matrix.M13;
    /*float*/ var num4 = matrix.M14;
    /*float*/ var num5 = matrix.M21;
    /*float*/ var num6 = matrix.M22;
    /*float*/ var num7 = matrix.M23;
    /*float*/ var num8 = matrix.M24;
    /*float*/ var num9 = matrix.M31;
    /*float*/ var num10 = matrix.M32;
    /*float*/ var num11 = matrix.M33;
    /*float*/ var num12 = matrix.M34;
    /*float*/ var num13 = matrix.M41;
    /*float*/ var num14 = matrix.M42;
    /*float*/ var num15 = matrix.M43;
    /*float*/ var num16 = matrix.M44;
    /*float*/ var num17 = /*(float)*/ (
      /*(double)*/ num11 * /*(double)*/ num16 -
      /*(double)*/ num12 * /*(double)*/ num15
    );
    /*float*/ var num18 = /*(float)*/ (
      /*(double)*/ num10 * /*(double)*/ num16 -
      /*(double)*/ num12 * /*(double)*/ num14
    );
    /*float*/ var num19 = /*(float)*/ (
      /*(double)*/ num10 * /*(double)*/ num15 -
      /*(double)*/ num11 * /*(double)*/ num14
    );
    /*float*/ var num20 = /*(float)*/ (
      /*(double)*/ num9 * /*(double)*/ num16 -
      /*(double)*/ num12 * /*(double)*/ num13
    );
    /*float*/ var num21 = /*(float)*/ (
      /*(double)*/ num9 * /*(double)*/ num15 -
      /*(double)*/ num11 * /*(double)*/ num13
    );
    /*float*/ var num22 = /*(float)*/ (
      /*(double)*/ num9 * /*(double)*/ num14 -
      /*(double)*/ num10 * /*(double)*/ num13
    );
    /*float*/ var num23 = /*(float)*/ (
      /*(double)*/ num6 * /*(double)*/ num17 -
      /*(double)*/ num7 * /*(double)*/ num18 +
      /*(double)*/ num8 * /*(double)*/ num19
    );
    /*float*/ var num24 = /*(float)*/ -(
      /*(double)*/ num5 * /*(double)*/ num17 -
      /*(double)*/ num7 * /*(double)*/ num20 +
      /*(double)*/ num8 * /*(double)*/ num21
    );
    /*float*/ var num25 = /*(float)*/ (
      /*(double)*/ num5 * /*(double)*/ num18 -
      /*(double)*/ num6 * /*(double)*/ num20 +
      /*(double)*/ num8 * /*(double)*/ num22
    );
    /*float*/ var num26 = /*(float)*/ -(
      /*(double)*/ num5 * /*(double)*/ num19 -
      /*(double)*/ num6 * /*(double)*/ num21 +
      /*(double)*/ num7 * /*(double)*/ num22
    );
    /*float*/ var num27 = /*(float)*/ (
      1.0 / (
        /*(double)*/ num1 * /*(double)*/ num23 +
        /*(double)*/ num2 * /*(double)*/ num24 +
        /*(double)*/ num3 * /*(double)*/ num25 +
        /*(double)*/ num4 * /*(double)*/ num26
      )
    );

    result.M11 = num23 * num27;
    result.M21 = num24 * num27;
    result.M31 = num25 * num27;
    result.M41 = num26 * num27;
    result.M12 = /*(float)*/ (
      -(
        /*(double)*/ num2 * /*(double)*/ num17 -
        /*(double)*/ num3 * /*(double)*/ num18 +
        /*(double)*/ num4 * /*(double)*/ num19
      ) * num27
    );
    result.M22 = /*(float)*/ (
      (
        /*(double)*/ num1 * /*(double)*/ num17 -
        /*(double)*/ num3 * /*(double)*/ num20 +
        /*(double)*/ num4 * /*(double)*/ num21
      ) * num27
    );
    result.M32 = /*(float)*/ (
      -(
        /*(double)*/ num1 * /*(double)*/ num18 -
        /*(double)*/ num2 * /*(double)*/ num20 +
        /*(double)*/ num4 * /*(double)*/ num22
      ) * num27
    );
    result.M42 = /*(float)*/ (
      (
        /*(double)*/ num1 * /*(double)*/ num19 -
        /*(double)*/ num2 * /*(double)*/ num21 +
        /*(double)*/ num3 * /*(double)*/ num22
      ) * num27
    );
    /*float*/ var num28 = /*(float)*/ (
      /*(double)*/ num7 * /*(double)*/ num16 -
      /*(double)*/ num8 * /*(double)*/ num15
    );
    /*float*/ var num29 = /*(float)*/ (
      /*(double)*/ num6 * /*(double)*/ num16 -
      /*(double)*/ num8 * /*(double)*/ num14
    );
    /*float*/ var num30 = /*(float)*/ (
      /*(double)*/ num6 * /*(double)*/ num15 -
      /*(double)*/ num7 * /*(double)*/ num14
    );
    /*float*/ var num31 = /*(float)*/ (
      /*(double)*/ num5 * /*(double)*/ num16 -
      /*(double)*/ num8 * /*(double)*/ num13
    );
    /*float*/ var num32 = /*(float)*/ (
      /*(double)*/ num5 * /*(double)*/ num15 -
      /*(double)*/ num7 * /*(double)*/ num13
    );
    /*float*/ var num33 = /*(float)*/ (
      /*(double)*/ num5 * /*(double)*/ num14 -
      /*(double)*/ num6 * /*(double)*/ num13
    );
    result.M13 = /*(float)*/ (
      (
        /*(double)*/ num2 * /*(double)*/ num28 -
        /*(double)*/ num3 * /*(double)*/ num29 +
        /*(double)*/ num4 * /*(double)*/ num30
      ) * num27
    );
    result.M23 = /*(float)*/ (
      -(
        /*(double)*/ num1 * /*(double)*/ num28 -
        /*(double)*/ num3 * /*(double)*/ num31 +
        /*(double)*/ num4 * /*(double)*/ num32
      ) * num27
    );
    result.M33 = /*(float)*/ (
      (
        /*(double)*/ num1 * /*(double)*/ num29 -
        /*(double)*/ num2 * /*(double)*/ num31 +
        /*(double)*/ num4 * /*(double)*/ num33
      ) * num27
    );
    result.M43 = /*(float)*/ (
      -(
        /*(double)*/ num1 * /*(double)*/ num30 -
        /*(double)*/ num2 * /*(double)*/ num32 +
        /*(double)*/ num3 * /*(double)*/ num33
      ) * num27
    );
    /*float*/ var num34 = /*(float)*/ (
      /*(double)*/ num7 * /*(double)*/ num12 -
      /*(double)*/ num8 * /*(double)*/ num11
    );
    /*float*/ var num35 = /*(float)*/ (
      /*(double)*/ num6 * /*(double)*/ num12 -
      /*(double)*/ num8 * /*(double)*/ num10
    );
    /*float*/ var num36 = /*(float)*/ (
      /*(double)*/ num6 * /*(double)*/ num11 -
      /*(double)*/ num7 * /*(double)*/ num10
    );
    /*float*/ var num37 = /*(float)*/ (
      /*(double)*/ num5 * /*(double)*/ num12 -
      /*(double)*/ num8 * /*(double)*/ num9);
    /*float*/ var num38 = /*(float)*/ (
      /*(double)*/ num5 * /*(double)*/ num11 -
      /*(double)*/ num7 * /*(double)*/ num9
    );
    /*float*/ var num39 = /*(float)*/ (
      /*(double)*/ num5 * /*(double)*/ num10 -
      /*(double)*/ num6 * /*(double)*/ num9
    );
    result.M14 = /*(float)*/ (
      -(
        /*(double)*/ num2 * /*(double)*/ num34 -
        /*(double)*/ num3 * /*(double)*/ num35 +
        /*(double)*/ num4 * /*(double)*/ num36
      ) * num27
    );
    result.M24 = /*(float)*/ (
      (
        /*(double)*/ num1 * /*(double)*/ num34 -
        /*(double)*/ num3 * /*(double)*/ num37 +
        /*(double)*/ num4 * /*(double)*/ num38
      ) * num27
    );
    result.M34 = /*(float)*/ (
      -(
        /*(double)*/ num1 * /*(double)*/ num35 -
        /*(double)*/ num2 * /*(double)*/ num37 +
        /*(double)*/ num4 * /*(double)*/ num39
      ) * num27
    );
    result.M44 = /*(float)*/ (
      (
        /*(double)*/ num1 * /*(double)*/ num36 -
        /*(double)*/ num2 * /*(double)*/ num38 +
        /*(double)*/ num3 * /*(double)*/ num39
      ) * num27
    );
    return result;
  }

  /// <summary>
  /// Creates a new <see cref="Matrix"/> that contains a multiplication of two matrix.
  /// </summary>
  /// <param name="matrix1">Source <see cref="Matrix"/>.</param>
  /// <param name="matrix2">Source <see cref="Matrix"/>.</param>
  /// <param name="result">Result of the matrix multiplication as an output parameter.</param>
  /*public*/ static /*void*/ Multiply(/*ref*/ /*Matrix*/ matrix1, /*ref*/ /*Matrix*/ matrix2, /*out*/ /*Matrix*/ result = new CMatrix())
  {
    /*float*/ var m11 = (
      (matrix1.M11 * matrix2.M11) +
      (matrix1.M12 * matrix2.M21) +
      (matrix1.M13 * matrix2.M31) +
      (matrix1.M14 * matrix2.M41)
    );
    /*float*/ var m12 = (
      (matrix1.M11 * matrix2.M12) +
      (matrix1.M12 * matrix2.M22) +
      (matrix1.M13 * matrix2.M32) +
      (matrix1.M14 * matrix2.M42)
    );
    /*float*/ var m13 = (
      (matrix1.M11 * matrix2.M13) +
      (matrix1.M12 * matrix2.M23) +
      (matrix1.M13 * matrix2.M33) +
      (matrix1.M14 * matrix2.M43)
    );
    /*float*/ var m14 = (
      (matrix1.M11 * matrix2.M14) +
      (matrix1.M12 * matrix2.M24) +
      (matrix1.M13 * matrix2.M34) +
      (matrix1.M14 * matrix2.M44)
    );
    /*float*/ var m21 = (
      (matrix1.M21 * matrix2.M11) +
      (matrix1.M22 * matrix2.M21) +
      (matrix1.M23 * matrix2.M31) +
      (matrix1.M24 * matrix2.M41)
    );
    /*float*/ var m22 = (
      (matrix1.M21 * matrix2.M12) +
      (matrix1.M22 * matrix2.M22) +
      (matrix1.M23 * matrix2.M32) +
      (matrix1.M24 * matrix2.M42)
    );
    /*float*/ var m23 = (
      (matrix1.M21 * matrix2.M13) +
      (matrix1.M22 * matrix2.M23) +
      (matrix1.M23 * matrix2.M33) +
      (matrix1.M24 * matrix2.M43)
      );
    /*float*/ var m24 = (
      (matrix1.M21 * matrix2.M14) +
      (matrix1.M22 * matrix2.M24) +
      (matrix1.M23 * matrix2.M34) +
      (matrix1.M24 * matrix2.M44)
    );
    /*float*/ var m31 = (
      (matrix1.M31 * matrix2.M11) +
      (matrix1.M32 * matrix2.M21) +
      (matrix1.M33 * matrix2.M31) +
      (matrix1.M34 * matrix2.M41)
    );
    /*float*/ var m32 = (
      (matrix1.M31 * matrix2.M12) +
      (matrix1.M32 * matrix2.M22) +
      (matrix1.M33 * matrix2.M32) +
      (matrix1.M34 * matrix2.M42)
    );
    /*float*/ var m33 = (
      (matrix1.M31 * matrix2.M13) +
      (matrix1.M32 * matrix2.M23) +
      (matrix1.M33 * matrix2.M33) +
      (matrix1.M34 * matrix2.M43)
    );
    /*float*/ var m34 = (
      (matrix1.M31 * matrix2.M14) +
      (matrix1.M32 * matrix2.M24) +
      (matrix1.M33 * matrix2.M34) +
      (matrix1.M34 * matrix2.M44)
    );
    /*float*/ var m41 = (
      (matrix1.M41 * matrix2.M11) +
      (matrix1.M42 * matrix2.M21) +
      (matrix1.M43 * matrix2.M31) +
      (matrix1.M44 * matrix2.M41)
    );
    /*float*/ var m42 = (
      (matrix1.M41 * matrix2.M12) +
      (matrix1.M42 * matrix2.M22) +
      (matrix1.M43 * matrix2.M32) +
      (matrix1.M44 * matrix2.M42)
    );
    /*float*/ var m43 = (
      (matrix1.M41 * matrix2.M13) +
      (matrix1.M42 * matrix2.M23) +
      (matrix1.M43 * matrix2.M33) +
      (matrix1.M44 * matrix2.M43)
    );
    /*float*/ var m44 = (
      (matrix1.M41 * matrix2.M14) +
      (matrix1.M42 * matrix2.M24) +
      (matrix1.M43 * matrix2.M34) +
      (matrix1.M44 * matrix2.M44)
    );
    result.M11 = m11;
    result.M12 = m12;
    result.M13 = m13;
    result.M14 = m14;
    result.M21 = m21;
    result.M22 = m22;
    result.M23 = m23;
    result.M24 = m24;
    result.M31 = m31;
    result.M32 = m32;
    result.M33 = m33;
    result.M34 = m34;
    result.M41 = m41;
    result.M42 = m42;
    result.M43 = m43;
    result.M44 = m44;
    return result;
  }

  /// <summary>
  /// Swap the matrix rows and columns.
  /// </summary>
  /// <param name="matrix">The matrix for transposing operation.</param>
  /// <param name="result">The new <see cref="Matrix"/> which contains the transposing result as an output parameter.</param>
  /*public*/ static /*void*/ Transpose(/*ref*/ /*Matrix*/ matrix, /*out*/ /*Matrix*/ result = new CMatrix())
  {
    /*Matrix*/ var ret = new CMatrix();

    ret.M11 = matrix.M11;
    ret.M12 = matrix.M21;
    ret.M13 = matrix.M31;
    ret.M14 = matrix.M41;

    ret.M21 = matrix.M12;
    ret.M22 = matrix.M22;
    ret.M23 = matrix.M32;
    ret.M24 = matrix.M42;

    ret.M31 = matrix.M13;
    ret.M32 = matrix.M23;
    ret.M33 = matrix.M33;
    ret.M34 = matrix.M43;

    ret.M41 = matrix.M14;
    ret.M42 = matrix.M24;
    ret.M43 = matrix.M34;
    ret.M44 = matrix.M44;

    CMatrix.Assign(result, ret);
    return result;
  }
};

CMatrix.identity = new CMatrix(
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
);

/// <summary>
/// Defines sprite visual options for mirroring.
/// </summary>
//[Flags]
ESpriteEffects = {
  /// <summary>
  /// No options specified.
  /// </summary>
  None: 0,
  /// <summary>
  /// Render the sprite reversed along the X axis.
  /// </summary>
  FlipHorizontally: 1,
  /// <summary>
  /// Render the sprite reversed along the Y axis.
  /// </summary>
  FlipVertically: 2
}


CColor = class CColor {
  static New() { var me = new CColor(); me._value = chroma(); return me; }

  static FromRGBA(r=1.0, g=1.0, b=1.0, a=1.0) {
    var me = new CColor();
    me._value = chroma.rgb(255*r, 255*g, 255*b, a);
    return me;
  }

  static FromRGB(r=1.0, g=1.0, b=1.0) {
    return CColor.FromRGBA(r,g,b,1.0);
  }

  toString() {
    return this.Clamped._value.toString();
  }

  Clone(dst = CColor.New()) {
    dst.Assign(this);
    return dst;
  }

  Assign(value) {
    this.R = value.R;
    this.G = value.G;
    this.B = value.B;
    this.A = value.A;
  }

  Reset(r, g, b, a=1.0) {
    this.R = r;
    this.G = g;
    this.B = b;
    this.A = a;
  }

  get IsClamped() {
    var r = this._value._rgb[0];
    var g = this._value._rgb[1];
    var b = this._value._rgb[2];
    return (r >= 0 && r < 256 &&
      g >= 0 && g < 256 &&
      b >= 0 && b < 256);
  }

  get Clamped() {
    var r = Math.max(0,Math.min(255,this._value._rgb[0]));
    var g = Math.max(0,Math.min(255,this._value._rgb[1]));
    var b = Math.max(0,Math.min(255,this._value._rgb[2]));
    return CColor.FromRGBA(
      CMath.Clamp(0,1,this.R),
      CMath.Clamp(0,1,this.G),
      CMath.Clamp(0,1,this.B),
      CMath.Clamp(0,1,this.A));
  }

  get R() {
    return this._value._rgb[0] / 255.0;
  }
  get G() {
    return this._value._rgb[1] / 255.0;
  }
  get B() {
    return this._value._rgb[2] / 255.0;
  }
  get A() {
    return this._value._rgb[3];
  }

  /*
  set R(value) { this._value._rgb[0] = Math.floor(255*Math.max(0, Math.min(1, value))); }
  set G(value) { this._value._rgb[1] = Math.floor(255*Math.max(0, Math.min(1, value))); }
  set B(value) { this._value._rgb[2] = Math.floor(255*Math.max(0, Math.min(1, value))); }
  set A(value) { this._value._rgb[2] = Math.max(0, Math.min(1, value)); }
  */
  set R(value) { this._value._rgb[0] = 255*value; }
  set G(value) { this._value._rgb[1] = 255*value; }
  set B(value) { this._value._rgb[2] = 255*value; }
  set A(value) { this._value._rgb[2] = CMath.Clamp(0, 1, value); }

  static get White() {
    return CColor.FromRGBA(1,1,1,1);
  }

  static get Black() {
    return CColor.FromRGBA(0,0,0,1);
  }
}

CGame = class CGame {
  Tick()
  {
  }
};
