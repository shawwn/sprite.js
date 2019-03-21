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
  static Min(x, y) { return Math.min(x, y); }
  static Max(x, y) { return Math.max(x, y); }
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

CPoint = class CPoint {
  constructor(x = 0, y = 0) {
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
  /// Compares whether current instance is equal to specified <see cref="Point"/>.
  /// </summary>
  /// <param name="other">The <see cref="Point"/> to compare.</param>
  /// <returns><c>true</c> if the instances are equal; <c>false</c> otherwise.</returns>
  /*public*/ /*bool*/ Equals(/*Point*/ other)
  {
    return (other instanceof CPoint) && ((this.X === other.X) && (this.Y === other.Y));
  }

// 		/// <summary>
// 		/// Gets the hash code of this <see cref="Point"/>.
// 		/// </summary>
// 		/// <returns>Hash code of this <see cref="Point"/>.</returns>
// 		public override int GetHashCode()
// 		{
// 			return X ^ Y;
// 		}


  static get Zero() {
    return new CPoint(0, 0);
  }


  /*public*/ /*CPoint*/ /*operator*/ ["="](/*Point*/ p2)
  {
    this.X = p2.X;
    this.Y = p2.Y;
    return this;
  }


  /*public*/ /*bool*/ /*operator*/ ["=="](/*Point*/ p2)
  {
    return this.Equals(p2);
  }

  /*public*/ /*bool*/ /*operator*/ ["==="](/*Point*/ p2)
  {
    return this.Equals(p2);
  }

  /*public*/ /*bool*/ /*operator*/ ["!="](/*Point*/ p2)
  {
    return !this.Equals(p2);
  }

  /*public*/ static /*bool*/ /*operator*/ ["+"](/*Point*/ p1, /*Point*/ p2)
  {
    return new CPoint(p1.X + p2.X, p1.Y + p2.Y);
  }
  /*public*/ /*bool*/ /*operator*/ ["+"](/*Point*/ p2)
  {
    return new CPoint(this.X + p2.X, this.Y + p2.Y);
  }

  /*public*/ static /*bool*/ /*operator*/ ["-"](/*Point*/ p1, /*Point*/ p2)
  {
    return new CPoint(p1.X - p2.X, p1.Y - p2.Y);
  }
  /*public*/ /*bool*/ /*operator*/ ["-"](/*Point*/ p2)
  {
    return new CPoint(this.X - p2.X, this.Y - p2.Y);
  }

  /*public*/ static /*bool*/ /*operator*/ ["*"](/*Point*/ p1, /*Point*/ p2)
  {
    return new CPoint(p1.X * p2.X, p1.Y * p2.Y);
  }
  /*public*/ /*bool*/ /*operator*/ ["*"](/*Point*/ p2)
  {
    return new CPoint(this.X * p2.X, this.Y * p2.Y);
  }

  /*public*/ static /*bool*/ /*operator*/ ["/"](/*Point*/ p1, /*Point*/ p2)
  {
    return new CPoint(p1.X / p2.X, p1.Y / p2.Y);
  }
  /*public*/ /*bool*/ /*operator*/ ["/"](/*Point*/ p2)
  {
    return new CPoint(this.X / p2.X, this.Y / p2.Y);
  }
};

CRectangle = class CRectangle {
  constructor(x=0, y=0, width=0, height=0) {
    this.X = x;
    this.Y = y;
    this.Width = width;
    this.Height = height;
  }

  /// <summary>
  /// Returns the x coordinate of the left edge of this <see cref="Rectangle"/>.
  /// </summary>
  // public int Left
  // {
  //   get
  //   {
  //     return X;
  //   }
  // }
  get Left()
  {
    return this.X;
  }

  /// <summary>
  /// Returns the x coordinate of the right edge of this <see cref="Rectangle"/>.
  /// </summary>
  // public int Right
  // {
  //   get
  //   {
  //     return (X + Width);
  //   }
  // }
  get Right()
  {
    return this.X + this.Width;
  }

  /// <summary>
  /// Returns the y coordinate of the top edge of this <see cref="Rectangle"/>.
  /// </summary>
  // public int Top
  // {
  //   get
  //   {
  //     return Y;
  //   }
  // }
  get Top()
  {
    return this.Y;
  }

  /// <summary>
  /// Returns the y coordinate of the bottom edge of this <see cref="Rectangle"/>.
  /// </summary>
  // public int Bottom
  // {
  //   get
  //   {
  //     return (Y + Height);
  //   }
  // }
  get Bottom()
  {
    return this.Y + this.Height;
  }

  /// <summary>
  /// The top-left coordinates of this <see cref="Rectangle"/>.
  /// </summary>
  // public Point Location
  // {
  //   get
  //   {
  //     return new Point(X, Y);
  //   }
  //   set
  //   {
  //     X = value.X;
  //     Y = value.Y;
  //   }
  // }
  get Location()
  {
    return new CPoint(this.X, this.Y);
  }
  set Location(value)
  {
    this.X = value.X;
    this.Y = value.Y;
  }

  /// <summary>
  /// A <see cref="Point"/> located in the center of this <see cref="Rectangle"/>'s bounds.
  /// </summary>
  /// <remarks>
  /// If <see cref="Width"/> or <see cref="Height"/> is an odd number,
  /// the center point will be rounded down.
  /// </remarks>
  // public Point Center
  // {
  //   get
  //   {
  //     return new Point(
  //       X + (Width / 2),
  //       Y + (Height / 2)
  //     );
  //   }
  // }
  get Center()
  {
    return new CPoint(this.X + (this.Width / 2), this.Y + (this.Height / 2)); // TODO: truncate?
  }

  /// <summary>
  /// Whether or not this <see cref="Rectangle"/> has a width and
  /// height of 0, and a position of (0, 0).
  /// </summary>
  // public bool IsEmpty
  // {
  //   get
  //   {
  //     return (	(Width == 0) &&
  //         (Height == 0) &&
  //         (X == 0) &&
  //         (Y == 0)	);
  //   }
  // }
  get IsEmpty()
  {
    return (this.Width === 0) && (this.Height === 0) && (this.X === 0) && (this.Y === 0);
  }

  /// <summary>
  /// Returns a <see cref="Rectangle"/> with X=0, Y=0, Width=0, and Height=0.
  /// </summary>
  static get Empty()
  {
    return new CRectangle();
  }
};

CViewport = class CViewport {
  /// <summary>
  /// Constructs a viewport from the given values. The <see cref="MinDepth"/> will be 0.0 and <see cref="MaxDepth"/> will be 1.0.
  /// </summary>
  /// <param name="x">The x coordinate of the upper-left corner of the view bounds in pixels.</param>
  /// <param name="y">The y coordinate of the upper-left corner of the view bounds in pixels.</param>
  /// <param name="width">The width of the view bounds in pixels.</param>
  /// <param name="height">The height of the view bounds in pixels.</param>
  /*public*/ CViewport4(/*int*/ x, /*int*/ y, /*int*/ width, /*int*/ height)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.minDepth = 0.0;
    this.maxDepth = 1.0;
  }

  /// <summary>
  /// Constructs a viewport from the given values.
  /// </summary>
  /// <param name="bounds">A <see cref="Rectangle"/> that defines the location and size of the <see cref="Viewport"/> in a render target.</param>
  /*public*/ CViewport1(/*Rectangle*/ bounds)
  {
    this.x = bounds.X;
    this.y = bounds.Y;
    this.width = bounds.Width;
    this.height = bounds.Height;
    this.minDepth = 0.0;
    this.maxDepth = 1.0;
  }

  constructor(...args)
  {
    switch(args.length) {
      case 1: this.CViewport1(...args); break;
      case 4: this.CViewport4(...args); break;
      default: throw new CArgumentException("Invalid argument count");
    }
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

CEventArgs = class CEventArgs {
  /*public*/ static /*readonly*/ /*EventArgs*/ get Empty(){
    if (CEventArgs.INTERNAL_Empty == null)
      CEventArgs.INTERNAL_Empty = new CEventArgs();
    return CEventArgs.INTERNAL_Empty;
  }
};

CGameWindow = class CGameWindow {
  constructor()
  {
    /*
    public event EventHandler<EventArgs> ClientSizeChanged;
    public event EventHandler<EventArgs> OrientationChanged;
    public event EventHandler<EventArgs> ScreenDeviceNameChanged;
    */
    this.ClientSizeChanged = new EventHandler();
    this.OrientationChanged = new EventHandler();
    this.ScreenDeviceNameChanged = new EventHandler();
    this.INTERNAL_title = "";
    this.AllowUserResizing = false;
  }

  /*
  public string Title
  {
    get
    {
      return _title;
    }
    set
    {
      if (_title != value)
      {
        SetTitle(value);
        _title = value;
      }
    }
  }
  */
  get Title()
  { 
    return this.INTERNAL_title;
  }
  set Title(value)
  {
    if (this.INTERNAL_title !== value)
    {
      this.SetTitle(value);
      this.INTERNAL_title = value;
    }
  }

  /*protected*/ /*abstract*/ /*void*/ SetTitle(/*string*/ title) {
    throw new CNotImplementedException("CGameWindow::SetTitle");
  }

  /*public*/ /*abstract*/ /*void*/ BeginScreenDeviceChange(/*bool*/ willBeFullScreen) {
    throw new CNotImplementedException("CGameWindow::BeginScreenDeviceChange");
  }

  /*public*/ /*abstract*/ /*void*/ EndScreenDeviceChange(
    /*string*/ screenDeviceName,
    /*int*/ clientWidth,
    /*int*/ clientHeight
  ) {
    throw new CNotImplementedException("CGameWindow::EndScreenDeviceChange");
  }

  /*public*/ /*void*/ EndScreenDeviceChange1(/*string*/ screenDeviceName)
  {
    this.EndScreenDeviceChange(
      screenDeviceName,
      this.ClientBounds.Width,
      this.ClientBounds.Height
    );
  }
};

CGameServiceContainer = class CGameServiceContainer //extends IServiceProvider
{
  constructor()
  {
    this.services = Object.create(null);
  }

  /*public*/ /*void*/ AddService(/*Type*/ type, /*object*/ provider)
  {
    if (type == null)
    {
      throw new CArgumentNullException("type");
    }
    if (provider == null)
    {
      throw new CArgumentNullException("provider");
    }
    // if (!type.IsAssignableFrom(provider.GetType()))
    // {
    //   throw new ArgumentException(
    //     "The provider does not match the specified service type!"
    //   );
    // }

    //this.services.Add(type, provider);
    this.services[type] = provider;
  }

  /*public*/ /*object*/ GetService(/*Type*/ type)
  {
    if (type == null)
    {
      throw new CArgumentNullException("type");
    }

    // object service;
    // if (services.TryGetValue(type, out service))
    // {
    //   return service;
    // }
    if (Object.hasOwnProperty.call(this.services, type))
    {
      return this.services[type];
    }

    return null;
  }

  /*public*/ /*void*/ RemoveService(/*Type*/ type)
  {
    if (type == null)
    {
      throw new CArgumentNullException("type");
    }

    //services.Remove(type);
    delete this.services[type];
  }
};

CGame = class CGame extends IDisposable {
	/*private*/ static /*readonly*/ /*TimeSpan*/ get MaxElapsedTime() {
    if (typeof CGame.INTERNAL_MaxElapsedTime === "undefined") {
      CGame.INTERNAL_MaxElapsedTime = CTimeSpan.FromMilliseconds(500);
    }
    return CGame.INTERNAL_MaxElapsedTime;
  }

  constructor(nativeWindow, display = "") {
    super();

    this.Exiting = new EventHandler()
    this.Activated = new EventHandler()
    this.Deactivated = new EventHandler()

    // AppDomain.CurrentDomain.UnhandledException += OnUnhandledException;

    // LaunchParameters = new LaunchParameters();
    // Components = new GameComponentCollection();
    this.Services = new CGameServiceContainer();
    // Content = new ContentManager(Services);

    // updateableComponents = new List<IUpdateable>();
    // currentlyUpdatingComponents = new List<IUpdateable>();
    // drawableComponents = new List<IDrawable>();
    // currentlyDrawingComponents = new List<IDrawable>();

    // IsMouseVisible = false;
    // IsFixedTimeStep = true;
    this.IsFixedTimeStep = true;
    this.INTERNAL_isActive = false;
    this.TargetElapsedTime = CTimeSpan.FromTicks(166667); // 60fps
    this.InactiveSleepTime = CTimeSpan.FromSeconds(0.02);

    this.hasInitialized = false;
    this.suppressDraw = false;
    this.isDisposed = false;

    this.gameTime = new CGameTime();
    this.accumulatedElapsedTime = CTimeSpan.Zero;
    this.previousTicks = 0;
    this.updateFrameLag = 0;

    // Window = CFNAPlatform.CreateWindow();
    // Mouse.WindowHandle = Window.Handle;
    // TouchPanel.WindowHandle = Window.Handle;

    this.Window = new CFNAWindow(nativeWindow, display);

    // FrameworkDispatcher.Update();

    // Ready to run the loop!
    this.RunApplication = true;
  }

  get IsActive() { return this.INTERNAL_isActive; }
  set IsActive(value) {
    if (this.INTERNAL_isActive !== value)
    {
      this.INTERNAL_isActive = value;
      if (value) {
        this.OnActivated(this, CEventArgs.Empty);
      } else {
        this.OnDeactivated(this, CEventArgs.Empty);
      }
    }
  }

  /*
  private TimeSpan INTERNAL_targetElapsedTime;
  public TimeSpan TargetElapsedTime
  {
    get
    {
      return INTERNAL_targetElapsedTime;
    }
    set
    {
      if (value <= TimeSpan.Zero)
      {
        throw new ArgumentOutOfRangeException(
          "The time must be positive and non-zero.",
          default(Exception)
        );
      }

      INTERNAL_targetElapsedTime = value;
    }
  }
  */
  get TargetElapsedTime() { return this.INTERNAL_targetElapsedTime; }
  set TargetElapsedTime(value) {
      if (value["<="](CTimeSpan.Zero))
      {
        throw new CArgumentOutOfRangeException(
          "The time must be positive and non-zero."
        );
      }
      this.INTERNAL_targetElapsedTime = value;
  }

  /*public*/ /*void*/ Exit()
  {
    this.RunApplication = false;
    this.suppressDraw = true;
  }


  AssertNotDisposed()
  {
  }

  /*protected*/ /*virtual*/ /*void*/ Draw(/*GameTime*/ gameTime)
  {
    //console.log(["CGame::Draw", gameTime]);
    // lock (drawableComponents)
    // {
    //   for (int i = 0; i < drawableComponents.Count; i += 1)
    //   {
    //     currentlyDrawingComponents.Add(drawableComponents[i]);
    //   }
    // }
    // foreach (IDrawable drawable in currentlyDrawingComponents)
    // {
    //   if (drawable.Visible)
    //   {
    //     drawable.Draw(gameTime);
    //   }
    // }
    // currentlyDrawingComponents.Clear();
  }

  /*protected*/ /*virtual*/ /*void*/ Update(/*GameTime*/ gameTime)
  {
    //console.log(["CGame::Update", gameTime]);
    // lock (updateableComponents)
    // {
    //   for (int i = 0; i < updateableComponents.Count; i += 1)
    //   {
    //     currentlyUpdatingComponents.Add(updateableComponents[i]);
    //   }
    // }
    // foreach (IUpdateable updateable in currentlyUpdatingComponents)
    // {
    //   if (updateable.Enabled)
    //   {
    //     updateable.Update(gameTime);
    //   }
    // }
    // currentlyUpdatingComponents.Clear();

    // FrameworkDispatcher.Update();
  }

  /*protected*/ /*virtual*/ /*void*/ OnExiting(/*object*/ sender, /*EventArgs*/ args)
  {
    if (this.Exiting != null)
    {
      this.Exiting(this, args);
    }
  }

  /*protected*/ /*virtual*/ /*void*/ OnActivated(/*object*/ sender, /*EventArgs*/ args)
  {
    this.AssertNotDisposed();
    if (this.Activated != null)
    {
      this.Activated(this, args);
    }
  }

  /*protected*/ /*virtual*/ /*void*/ OnDeactivated(/*object*/ sender, /*EventArgs*/ args)
  {
    this.AssertNotDisposed();
    if (this.Deactivated != null)
    {
      this.Deactivated(this, args);
    }
  }

  /*protected*/ /*virtual*/ /*bool*/ BeginDraw()
  {
    return true;
  }

  /*protected*/ /*virtual*/ /*void*/ EndDraw()
  {
    if (this.GraphicsDevice != null)
    {
      this.GraphicsDevice.Present();
    }
  }

  /*protected*/ /*virtual*/ /*void*/ BeginRun()
  {
  }

  /*protected*/ /*virtual*/ /*void*/ EndRun()
  {
  }

  /*protected*/ /*virtual*/ /*void*/ LoadContent()
  {
  }

  /*protected*/ /*virtual*/ /*void*/ UnloadContent()
  {
  }

  /*protected*/ /*virtual*/ /*void*/ Initialize()
  {
    // TODO
    // /* According to the information given on MSDN, all GameComponents
    //  * in Components at the time Initialize() is called are initialized:
    //  *
    //  * http://msdn.microsoft.com/en-us/library/microsoft.xna.framework.game.initialize.aspx
    //  *
    //  * Note, however, that we are NOT using a foreach. It's actually
    //  * possible to add something during initialization, and those must
    //  * also be initialized. There may be a safer way to account for it,
    //  * considering it may be possible to _remove_ components as well,
    //  * but for now, let's worry about initializing everything we get.
    //  * -flibit
    //  */
    // for (int i = 0; i < Components.Count; i += 1)
    // {
    //   Components[i].Initialize();
    // }

    /* FIXME: If this test fails, is LoadContent ever called?
     * This seems like a condition that warrants an exception more
     * than a silent failure.
     */
    if (	this.graphicsDeviceService != null &&
      this.graphicsDeviceService.GraphicsDevice != null	)
    {
      this.graphicsDeviceService.DeviceDisposing["+="]((o, e) => this.UnloadContent(), this)
      this.LoadContent();
    }
  }

  /*private*/ /*void*/ DoInitialize()
  {
    this.AssertNotDisposed();

    this.InitializeGraphicsService();

    this.Initialize();

    // TODO
    // /* We need to do this after virtual Initialize(...) is called.
    //  * 1. Categorize components into IUpdateable and IDrawable lists.
    //  * 2. Subscribe to Added/Removed events to keep the categorized
    //  * lists synced and to Initialize future components as they are
    //  * added.
    //  */
    // updateableComponents.Clear();
    // drawableComponents.Clear();
    // for (int i = 0; i < Components.Count; i += 1)
    // {
    //   CategorizeComponent(Components[i]);
    // }
    // Components.ComponentAdded += OnComponentAdded;
    // Components.ComponentRemoved += OnComponentRemoved;
  }

  /*private*/ /*GraphicsDevice*/ InitializeGraphicsService()
  {
    this.graphicsDeviceService = /*(IGraphicsDeviceService)*/this.Services.GetService(/*typeof*/("IGraphicsDeviceService"));

    if (this.graphicsDeviceService == null)
    {
      throw new CInvalidOperationException(
        "No Graphics Device Service"
      );
    }

    // This will call IGraphicsDeviceManager.CreateDevice
    return this.graphicsDeviceService.GraphicsDevice;
  }

  /*public*/ /*void*/ async RunOneFrame()
  {
    if (!this.hasInitialized)
    {
      this.DoInitialize();
      this.gameTimer = CStopwatch.StartNew();
      this.hasInitialized = true;
    }

    this.BeginRun();

    // FIXME: Not quite right..
    await this.Tick();

    this.EndRun();
  }

  /*public*/ /*void*/ async Run()
  {
    this.AssertNotDisposed();

    if (!this.hasInitialized)
    {
      this.DoInitialize();
      this.hasInitialized = true;
    }

    this.BeginRun();
    this.gameTimer = CStopwatch.StartNew();

    await CFNAPlatform.RunLoop(this);

    this.EndRun();

    this.OnExiting(this, CEventArgs.Empty);
  }

  /*public*/ /*void*/ async Tick()
  {
    /* NOTE: This code is very sensitive and can break very badly,
     * even with what looks like a safe change. Be sure to test
     * any change fully in both the fixed and variable timestep
     * modes across multiple devices and platforms.
     */

  //RetryTick:

    // Advance the accumulated elapsed time.
    /*long*/ let currentTicks = this.gameTimer.Elapsed.Ticks;
    this.accumulatedElapsedTime["+="](CTimeSpan.FromTicks(currentTicks - this.previousTicks));
    this.previousTicks = currentTicks;

    /* If we're in the fixed timestep mode and not enough time has elapsed
     * to perform an update we sleep off the the remaining time to save battery
     * life and/or release CPU time to other threads and processes.
     */
    if (this.IsFixedTimeStep && this.accumulatedElapsedTime["<"](this.TargetElapsedTime))
    {
      /*
      int sleepTime = (
        (int) (TargetElapsedTime - accumulatedElapsedTime).TotalMilliseconds
      );
      */
      let sleepTime = (
        this.TargetElapsedTime["-"](this.accumulatedElapsedTime).TotalMilliseconds
      );

      /* NOTE: While sleep can be inaccurate in general it is
       * accurate enough for frame limiting purposes if some
       * fluctuation is an acceptable result.
       */
      //System.Threading.Thread.Sleep(sleepTime);
      await CThread.Sleep(sleepTime);

      //goto RetryTick;
      return await this.Tick();
    }

    // Do not allow any update to take longer than our maximum.
    if (this.accumulatedElapsedTime[">"](CGame.MaxElapsedTime))
    {
      this.accumulatedElapsedTime["="](CGame.MaxElapsedTime);
    }

    if (this.IsFixedTimeStep)
    {
      this.gameTime.ElapsedGameTime["="](this.TargetElapsedTime);
      /*int*/ let stepCount = 0;

      // Perform as many full fixed length time steps as we can.
      while (this.accumulatedElapsedTime[">="](this.TargetElapsedTime))
      {
        this.gameTime.TotalGameTime["+="](this.TargetElapsedTime);
        this.accumulatedElapsedTime["-="](this.TargetElapsedTime);
        stepCount += 1;

        this.AssertNotDisposed();
        await this.Update(this.gameTime);
      }

      // Every update after the first accumulates lag
      this.updateFrameLag += CMath.Max(0, stepCount - 1);

      /* If we think we are running slowly, wait
       * until the lag clears before resetting it
       */
      if (this.gameTime.IsRunningSlowly)
      {
        if (this.updateFrameLag === 0)
        {
          this.gameTime.IsRunningSlowly = false;
        }
      }
      else if (this.updateFrameLag >= 5)
      {
        /* If we lag more than 5 frames,
         * start thinking we are running slowly.
         */
        this.gameTime.IsRunningSlowly = true;
      }

      /* Every time we just do one update and one draw,
       * then we are not running slowly, so decrease the lag.
       */
      if (this.stepCount === 1 && this.updateFrameLag > 0)
      {
        this.updateFrameLag -= 1;
      }

      /* Draw needs to know the total elapsed time
       * that occured for the fixed length updates.
       */
      this.gameTime.ElapsedGameTime["="](CTimeSpan.FromTicks(this.TargetElapsedTime.Ticks * stepCount));
    }
    else
    {
      // Perform a single variable length update.
      if (this.forceElapsedTimeToZero)
      {
        /* When ResetElapsedTime is called,
         * Elapsed is forced to zero and
         * Total is ignored entirely.
         * -flibit
         */
        this.gameTime.ElapsedGameTime["="](CTimeSpan.Zero);
        this.forceElapsedTimeToZero = false;
      }
      else
      {
        this.gameTime.ElapsedGameTime["="](this.accumulatedElapsedTime);
        this.gameTime.TotalGameTime["+="](this.gameTime.ElapsedGameTime);
      }

      this.accumulatedElapsedTime["="](CTimeSpan.Zero);
      this.AssertNotDisposed();
      await this.Update(this.gameTime);
    }

    // Draw unless the update suppressed it.
    if (this.suppressDraw)
    {
      this.suppressDraw = false;
    }
    else
    {
      /* Draw/EndDraw should not be called if BeginDraw returns false.
       * http://stackoverflow.com/questions/4054936/manual-control-over-when-to-redraw-the-screen/4057180#4057180
       * http://stackoverflow.com/questions/4235439/xna-3-1-to-4-0-requires-constant-redraw-or-will-display-a-purple-screen
       */
      if (await this.BeginDraw())
      {
        await this.Draw(this.gameTime);
        await this.EndDraw();
      }
    }
  }
};

CFNAWindow = class CFNAWindow extends CGameWindow {
  constructor(/*IntPtr*/ nativeWindow, /*string*/ display)
  {
    super();
    this.window = nativeWindow;
    this.deviceName = display;
    this.wantsFullscreen = false;
  }

  get Handle()
  {
    return this.window;
  }

  get ClientBounds()
  {
    return CFNAPlatform.GetWindowBounds(this.window);
  }


  /*public*/ /*abstract*/ /*void*/ BeginScreenDeviceChange(/*bool*/ willBeFullScreen) {
    this.wantsFullscreen = willBeFullScreen;
  }

  /*public*/ /*abstract*/ /*void*/ EndScreenDeviceChange(
    /*string*/ screenDeviceName,
    /*int*/ clientWidth,
    /*int*/ clientHeight
  ) {
    /*string*/ let prevName = this.deviceName;
    CFNAPlatform.ApplyWindowChanges(
      this.window,
      clientWidth,
      clientHeight,
      this.wantsFullscreen,
      screenDeviceName,
      this
    );
    if (this.deviceName !== prevName)
    {
      this.OnScreenDeviceNameChanged();
    }
  }

  /*public*/ /*void*/ EndScreenDeviceChange1(/*string*/ screenDeviceName)
  {
    this.EndScreenDeviceChange(
      screenDeviceName,
      this.ClientBounds.Width,
      this.ClientBounds.Height
    );
  }
};

CBackbuffer = class CBackbuffer {
};

CNullBackbuffer = class CNullBackbuffer {
  /*public*/ /*NullBackbuffer*/ constructor(/*int*/ width, /*int*/ height, /*DepthFormat*/ depthFormat)
  {
    this.Width = width;
    this.Height = height;
    this.DepthFormat = depthFormat;
  }

  /*public*/ /*void*/ ResetFramebuffer(
    /*PresentationParameters*/ presentationParameters,
    /*bool*/ renderTargetBound
  ) {
    this.Width = presentationParameters.BackBufferWidth;
    this.Height = presentationParameters.BackBufferHeight;
  }
};

COpenGLBackbuffer = class COpenGLBackbuffer {
  /*public*/ /*OpenGLBackbuffer*/ constructor(
    /*OpenGLDevice*/ device,
    /*int*/ width,
    /*int*/ height,
    /*DepthFormat*/ depthFormat,
    /*int*/ multiSampleCount
  ) {
    throw new CNotImplementedException();
  }
};


COpenGLDevice = class COpenGLDevice {
  constructor(presentationParameters, adapter)
  {
    this.PresentationParameters = presentationParameters;
    this.Adapter = adapter;
    this.gl = this.PresentationParameters.DeviceWindowHandle.getContext("webgl");

    // Initialize the faux-backbuffer
    if (this.UseFauxBackbuffer(presentationParameters, adapter.CurrentDisplayMode))
    {
      if (!this.supportsFauxBackbuffer)
      {
        throw new CNoSuitableGraphicsDeviceException(
          "Your hardware does not support the faux-backbuffer!" +
          "\n\nKeep the window/backbuffer resolution the same."
        );
      }
      this.Backbuffer = new COpenGLBackbuffer(
        this,
        presentationParameters.BackBufferWidth,
        presentationParameters.BackBufferHeight,
        presentationParameters.DepthStencilFormat,
        presentationParameters.MultiSampleCount
      );
    }
    else
    {
      this.Backbuffer = new CNullBackbuffer(
        presentationParameters.BackBufferWidth,
        presentationParameters.BackBufferHeight,
        this.windowDepthFormat
      );
    }
  }

  UseFauxBackbuffer(pp, dm) {
    return false;
  }

  /*public*/ /*void*/ ResetBackbuffer(
    /*PresentationParameters*/ presentationParameters,
    /*GraphicsAdapter*/ adapter,
    /*bool*/ renderTargetBound
  ) {
    if (this.UseFauxBackbuffer(presentationParameters, adapter.CurrentDisplayMode))
    {
      if (this.Backbuffer instanceof CNullBackbuffer)
      {
        if (!this.supportsFauxBackbuffer)
        {
          throw new CNoSuitableGraphicsDeviceException(
            "Your hardware does not support the faux-backbuffer!" +
            "\n\nKeep the window/backbuffer resolution the same."
          );
        }
        this.Backbuffer = new COpenGLBackbuffer(
          this,
          presentationParameters.BackBufferWidth,
          presentationParameters.BackBufferHeight,
          presentationParameters.DepthStencilFormat,
          presentationParameters.MultiSampleCount
        );
      }
      else
      {
        this.Backbuffer.ResetFramebuffer(
          presentationParameters,
          renderTargetBound
        );
      }
    }
    else
    {
      if (this.Backbuffer instanceof COpenGLBackbuffer)
      {
        //(Backbuffer as OpenGLBackbuffer).Dispose();
        this.Backbuffer.Dispose();
        this.Backbuffer = new CNullBackbuffer(
          presentationParameters.BackBufferWidth,
          presentationParameters.BackBufferHeight,
          this.windowDepthFormat
        );
      }
      else
      {
        this.Backbuffer.ResetFramebuffer(
          presentationParameters,
          renderTargetBound
        );
      }
    }
  }

};

CModernOpenGLDevice = class CModernOpenGLDevice {
  constructor(presentationParameters, adapter)
  {
    this.PresentationParameters = presentationParameters;
    this.Adapter = adapter;
  }
};

CFNAPlatform = class CFNAPlatform {

  /*public*/ static /*IGLDevice*/ CreateGLDevice(
    /*PresentationParameters*/ presentationParameters,
    /*GraphicsAdapter*/ adapter
  ) {
    // This loads the OpenGL entry points.
    if (CEnvironment.GetEnvironmentVariable("FNA_GRAPHICS_FORCE_GLDEVICE") === "ModernGLDevice")
    {
      // FIXME: This is still experimental! -flibit
      return new CModernGLDevice(presentationParameters, adapter);
    }
    return new COpenGLDevice(presentationParameters, adapter);
  }


  /*public*/ static /*Rectangle*/ GetWindowBounds(/*IntPtr*/ window)
  {
    let rect = window.getBoundingClientRect()
    return new CRectangle(rect.x, rect.y, rect.width, rect.height);
  }

  /*public*/ static /*bool*/ SupportsOrientationChanges()
  {
    return false;
  }

  /*public*/ static /*void*/ ApplyWindowChanges(
    /*IntPtr*/ window,
    /*int*/ clientWidth,
    /*int*/ clientHeight,
    /*bool*/ wantsFullscreen,
    /*string*/ screenDeviceName,
    /*ref*/ /*string*/ resultDeviceName
  ) {
    // bool center = false;
    // if (	Environment.GetEnvironmentVariable("FNA_GRAPHICS_ENABLE_HIGHDPI") == "1" &&
    //   OSVersion.Equals("Mac OS X")	)
    // {
    //   /* For high-DPI windows, halve the size!
    //    * The drawable size is now the primary width/height, so
    //    * the window needs to accommodate the GL viewport.
    //    * -flibit
    //    */
    //   clientWidth /= 2;
    //   clientHeight /= 2;
    // }

    // // When windowed, set the size before moving
    // if (!wantsFullscreen)
    // {
    //   bool resize = false;
    //   if ((SDL.SDL_GetWindowFlags(window) & (uint) SDL.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN) != 0)
    //   {
    //     SDL.SDL_SetWindowFullscreen(window, 0);
    //     resize = true;
    //   }
    //   else
    //   {
    //     int w, h;
    //     SDL.SDL_GetWindowSize(
    //       window,
    //       out w,
    //       out h
    //     );
    //     resize = (clientWidth != w || clientHeight != h);
    //   }
    //   if (resize)
    //   {
    //     SDL.SDL_SetWindowSize(window, clientWidth, clientHeight);
    //     center = true;
    //   }
    // }

    // // Get on the right display!
    // int displayIndex = 0;
    // for (int i = 0; i < GraphicsAdapter.Adapters.Count; i += 1)
    // {
    //   if (screenDeviceName == GraphicsAdapter.Adapters[i].DeviceName)
    //   {
    //     displayIndex = i;
    //     break;
    //   }
    // }

    // // Just to be sure, become a window first before changing displays
    // if (resultDeviceName != screenDeviceName)
    // {
    //   SDL.SDL_SetWindowFullscreen(window, 0);
    //   resultDeviceName = screenDeviceName;
    //   center = true;
    // }

    // // Window always gets centered on changes, per XNA behavior
    // if (center)
    // {
    //   int pos = SDL.SDL_WINDOWPOS_CENTERED_DISPLAY(displayIndex);
    //   SDL.SDL_SetWindowPosition(
    //     window,
    //     pos,
    //     pos
    //   );
    // }

    // // Set fullscreen after we've done all the ugly stuff.
    // if (wantsFullscreen)
    // {
    //   if ((SDL.SDL_GetWindowFlags(window) & (uint) SDL.SDL_WindowFlags.SDL_WINDOW_SHOWN) == 0)
    //   {
    //     /* If we're still hidden, we can't actually go fullscreen yet.
    //      * But, we can at least set the hidden window size to match
    //      * what the window/drawable sizes will eventually be later.
    //      * -flibit
    //      */
    //     SDL.SDL_DisplayMode mode;
    //     SDL.SDL_GetCurrentDisplayMode(
    //       displayIndex,
    //       out mode
    //     );
    //     SDL.SDL_SetWindowSize(window, mode.w, mode.h);
    //   }
    //   SDL.SDL_SetWindowFullscreen(
    //     window,
    //     (uint) SDL.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN_DESKTOP
    //   );
    // }
  }

  /*public*/ static /*void*/ SetPresentationInterval(/*PresentInterval*/ interval)
  {
    // if (interval == PresentInterval.Default || interval == PresentInterval.One)
    // {
    //   bool disableLateSwapTear = (
    //     OSVersion.Equals("Mac OS X") ||
    //     OSVersion.Equals("WinRT") ||
    //     Environment.GetEnvironmentVariable("FNA_OPENGL_DISABLE_LATESWAPTEAR") == "1"
    //   );
    //   if (disableLateSwapTear)
    //   {
    //     SDL.SDL_GL_SetSwapInterval(1);
    //   }
    //   else
    //   {
    //     if (SDL.SDL_GL_SetSwapInterval(-1) != -1)
    //     {
    //       FNALoggerEXT.LogInfo("Using EXT_swap_control_tear VSync!");
    //     }
    //     else
    //     {
    //       FNALoggerEXT.LogInfo("EXT_swap_control_tear unsupported. Fall back to standard VSync.");
    //       SDL.SDL_ClearError();
    //       SDL.SDL_GL_SetSwapInterval(1);
    //     }
    //   }
    // }
    // else if (interval == PresentInterval.Immediate)
    // {
    //   SDL.SDL_GL_SetSwapInterval(0);
    // }
    // else if (interval == PresentInterval.Two)
    // {
    //   SDL.SDL_GL_SetSwapInterval(2);
    // }
    // else
    // {
    //   throw new NotSupportedException("Unrecognized PresentInterval!");
    // }
  }

  /*public*/ static /*void*/ async RunLoop(/*Game*/ game)
  {
    //SDL.SDL_ShowWindow(game.Window.Handle);
    game.IsActive = true;

// 			Rectangle windowBounds = game.Window.ClientBounds;
// 			Mouse.INTERNAL_WindowWidth = windowBounds.Width;
// 			Mouse.INTERNAL_WindowHeight = windowBounds.Height;

// 			// Which display did we end up on?
// 			int displayIndex = SDL.SDL_GetWindowDisplayIndex(
// 				game.Window.Handle
// 			);

// 			// Store this for internal event filter work
// 			activeGames.Add(game);

// 			// OSX has some fancy fullscreen features, let's use them!
// 			bool osxUseSpaces;
// 			if (OSVersion.Equals("Mac OS X"))
// 			{
// 				string hint = SDL.SDL_GetHint(SDL.SDL_HINT_VIDEO_MAC_FULLSCREEN_SPACES);
// 				osxUseSpaces = (String.IsNullOrEmpty(hint) || hint.Equals("1"));
// 			}
// 			else
// 			{
// 				osxUseSpaces = false;
// 			}

// 			// Perform initial check for a touch device
// 			TouchPanel.TouchDeviceExists = GetTouchCapabilities().IsConnected;

// 			// Do we want to read keycodes or scancodes?
// 			if (UseScancodes)
// 			{
// 				FNALoggerEXT.LogInfo("Using scancodes instead of keycodes!");
// 			}

// 			// Active Key List
// 			List<Keys> keys = new List<Keys>();

// 			/* Setup Text Input Control Character Arrays
// 			 * (Only 7 control keys supported at this time)
// 			 */
// 			char[] textInputCharacters = new char[]
// 			{
// 				(char) 2,	// Home
// 				(char) 3,	// End
// 				(char) 8,	// Backspace
// 				(char) 9,	// Tab
// 				(char) 13,	// Enter
// 				(char) 127,	// Delete
// 				(char) 22	// Ctrl+V (Paste)
// 			};
// 			Dictionary<Keys, int> textInputBindings = new Dictionary<Keys, int>()
// 			{
// 				{ Keys.Home,	0 },
// 				{ Keys.End,	1 },
// 				{ Keys.Back,	2 },
// 				{ Keys.Tab,	3 },
// 				{ Keys.Enter,	4 },
// 				{ Keys.Delete,	5 }
// 				// Ctrl+V is special!
// 			};
// 			bool[] textInputControlDown = new bool[textInputCharacters.Length];
// 			int[] textInputControlRepeat = new int[textInputCharacters.Length];
// 			bool textInputSuppress = false;

// 			SDL.SDL_Event evt;

    while (game.RunApplication)
    {
      // while (SDL.SDL_PollEvent(out evt) == 1)
      // {
      // 	// Keyboard
      // 	if (evt.type == SDL.SDL_EventType.SDL_KEYDOWN)
      // 	{
      // 		Keys key = ToXNAKey(ref evt.key.keysym);
      // 		if (!keys.Contains(key))
      // 		{
      // 			keys.Add(key);
      // 			int textIndex;
      // 			if (textInputBindings.TryGetValue(key, out textIndex))
      // 			{
      // 				textInputControlDown[textIndex] = true;
      // 				textInputControlRepeat[textIndex] = Environment.TickCount + 400;
      // 				TextInputEXT.OnTextInput(textInputCharacters[textIndex]);
      // 			}
      // 			else if (keys.Contains(Keys.LeftControl) && key == Keys.V)
      // 			{
      // 				textInputControlDown[6] = true;
      // 				textInputControlRepeat[6] = Environment.TickCount + 400;
      // 				TextInputEXT.OnTextInput(textInputCharacters[6]);
      // 				textInputSuppress = true;
      // 			}
      // 		}
      // 	}
      // 	else if (evt.type == SDL.SDL_EventType.SDL_KEYUP)
      // 	{
      // 		Keys key = ToXNAKey(ref evt.key.keysym);
      // 		if (keys.Remove(key))
      // 		{
      // 			int value;
      // 			if (textInputBindings.TryGetValue(key, out value))
      // 			{
      // 				textInputControlDown[value] = false;
      // 			}
      // 			else if ((!keys.Contains(Keys.LeftControl) && textInputControlDown[3]) || key == Keys.V)
      // 			{
      // 				textInputControlDown[6] = false;
      // 				textInputSuppress = false;
      // 			}
      // 		}
      // 	}

      // 	// Mouse Input
      // 	else if (evt.type == SDL.SDL_EventType.SDL_MOUSEBUTTONDOWN)
      // 	{
      // 		Mouse.INTERNAL_onClicked(evt.button.button - 1);
      // 	}
      // 	else if (evt.type == SDL.SDL_EventType.SDL_MOUSEWHEEL)
      // 	{
      // 		// 120 units per notch. Because reasons.
      // 		Mouse.INTERNAL_MouseWheel += evt.wheel.y * 120;
      // 	}

      // 	// Touch Input
      // 	else if (evt.type == SDL.SDL_EventType.SDL_FINGERDOWN)
      // 	{
      // 		// Windows only notices a touch screen once it's touched
      // 		TouchPanel.TouchDeviceExists = true;

      // 		TouchPanel.INTERNAL_onTouchEvent(
      // 			(int)evt.tfinger.fingerId,
      // 			TouchLocationState.Pressed,
      // 			evt.tfinger.x,
      // 			evt.tfinger.y,
      // 			0,
      // 			0
      // 		);
      // 	}
      // 	else if (evt.type == SDL.SDL_EventType.SDL_FINGERMOTION)
      // 	{
      // 		TouchPanel.INTERNAL_onTouchEvent(
      // 			(int)evt.tfinger.fingerId,
      // 			TouchLocationState.Moved,
      // 			evt.tfinger.x,
      // 			evt.tfinger.y,
      // 			evt.tfinger.dx,
      // 			evt.tfinger.dy
      // 		);
      // 	}
      // 	else if (evt.type == SDL.SDL_EventType.SDL_FINGERUP)
      // 	{
      // 		TouchPanel.INTERNAL_onTouchEvent(
      // 			(int)evt.tfinger.fingerId,
      // 			TouchLocationState.Released,
      // 			evt.tfinger.x,
      // 			evt.tfinger.y,
      // 			0,
      // 			0
      // 		);
      // 	}

      // 	// Various Window Events...
      // 	else if (evt.type == SDL.SDL_EventType.SDL_WINDOWEVENT)
      // 	{
      // 		// Window Focus
      // 		if (evt.window.windowEvent == SDL.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_GAINED)
      // 		{
      // 			game.IsActive = true;

      // 			if (!osxUseSpaces)
      // 			{
      // 				// If we alt-tab away, we lose the 'fullscreen desktop' flag on some WMs
      // 				SDL.SDL_SetWindowFullscreen(
      // 					game.Window.Handle,
      // 					game.GraphicsDevice.PresentationParameters.IsFullScreen ?
      // 						(uint) SDL.SDL_WindowFlags.SDL_WINDOW_FULLSCREEN_DESKTOP :
      // 						0
      // 				);
      // 			}

      // 			// Disable the screensaver when we're back.
      // 			SDL.SDL_DisableScreenSaver();
      // 		}
      // 		else if (evt.window.windowEvent == SDL.SDL_WindowEventID.SDL_WINDOWEVENT_FOCUS_LOST)
      // 		{
      // 			game.IsActive = false;

      // 			if (!osxUseSpaces)
      // 			{
      // 				SDL.SDL_SetWindowFullscreen(game.Window.Handle, 0);
      // 			}

      // 			// Give the screensaver back, we're not that important now.
      // 			SDL.SDL_EnableScreenSaver();
      // 		}

      // 		// Window Resize
      // 		else if (evt.window.windowEvent == SDL.SDL_WindowEventID.SDL_WINDOWEVENT_SIZE_CHANGED)
      // 		{
      // 			// This is called on both API and WM resizes
      // 			Mouse.INTERNAL_WindowWidth = evt.window.data1;
      // 			Mouse.INTERNAL_WindowHeight = evt.window.data2;
      // 		}
      // 		else if (evt.window.windowEvent == SDL.SDL_WindowEventID.SDL_WINDOWEVENT_RESIZED)
      // 		{
      // 			/* This should be called on user resize only, NOT ApplyChanges!
      // 			 * Sadly some window managers are idiots and fire events anyway.
      // 			 * Also ignore any other "resizes" (alt-tab, fullscreen, etc.)
      // 			 * -flibit
      // 			 */
      // 			if (GetWindowResizable(game.Window.Handle))
      // 			{
      // 				((FNAWindow) game.Window).INTERNAL_ClientSizeChanged();
      // 			}
      // 		}
      // 		else if (evt.window.windowEvent == SDL.SDL_WindowEventID.SDL_WINDOWEVENT_EXPOSED)
      // 		{
      // 			// This is typically called when the window is made bigger
      // 			game.RedrawWindow();
      // 		}

      // 		// Window Move
      // 		else if (evt.window.windowEvent == SDL.SDL_WindowEventID.SDL_WINDOWEVENT_MOVED)
      // 		{
      // 			/* Apparently if you move the window to a new
      // 			 * display, a GraphicsDevice Reset occurs.
      // 			 * -flibit
      // 			 */
      // 			int newIndex = SDL.SDL_GetWindowDisplayIndex(
      // 				game.Window.Handle
      // 			);
      // 			if (newIndex != displayIndex)
      // 			{
      // 				displayIndex = newIndex;
      // 				game.GraphicsDevice.Reset(
      // 					game.GraphicsDevice.PresentationParameters,
      // 					GraphicsAdapter.Adapters[displayIndex]
      // 				);
      // 			}
      // 		}

      // 		// Mouse Focus
      // 		else if (evt.window.windowEvent == SDL.SDL_WindowEventID.SDL_WINDOWEVENT_ENTER)
      // 		{
      // 			SDL.SDL_DisableScreenSaver();
      // 		}
      // 		else if (evt.window.windowEvent == SDL.SDL_WindowEventID.SDL_WINDOWEVENT_LEAVE)
      // 		{
      // 			SDL.SDL_EnableScreenSaver();
      // 		}
      // 	}

      // 	// Display Events
      // 	else if (evt.type == SDL.SDL_EventType.SDL_DISPLAYEVENT)
      // 	{
      // 		// Orientation Change
      // 		if (evt.display.displayEvent == SDL.SDL_DisplayEventID.SDL_DISPLAYEVENT_ORIENTATION)
      // 		{
      // 			DisplayOrientation orientation = INTERNAL_ConvertOrientation(
      // 				(SDL.SDL_DisplayOrientation) evt.display.data1
      // 			);

      // 			INTERNAL_HandleOrientationChange(
      // 				orientation,
      // 				game.GraphicsDevice,
      // 				(FNAWindow) game.Window
      // 			);
      // 		}
      // 	}

      // 	// Controller device management
      // 	else if (evt.type == SDL.SDL_EventType.SDL_CONTROLLERDEVICEADDED)
      // 	{
      // 		INTERNAL_AddInstance(evt.cdevice.which);
      // 	}
      // 	else if (evt.type == SDL.SDL_EventType.SDL_CONTROLLERDEVICEREMOVED)
      // 	{
      // 		INTERNAL_RemoveInstance(evt.cdevice.which);
      // 	}

      // 	// Text Input
      // 	else if (evt.type == SDL.SDL_EventType.SDL_TEXTINPUT && !textInputSuppress)
      // 	{
      // 		// Based on the SDL2# LPUtf8StrMarshaler
      // 		unsafe
      // 		{
      // 			byte* endPtr = evt.text.text;
      // 			if (*endPtr != 0)
      // 			{
      // 				int bytes = 0;
      // 				while (*endPtr != 0)
      // 				{
      // 					endPtr++;
      // 					bytes += 1;
      // 				}

      // 				/* UTF8 will never encode more characters
      // 				 * than bytes in a string, so bytes is a
      // 				 * suitable upper estimate of size needed
      // 				 */
      // 				char* charsBuffer = stackalloc char[bytes];
      // 				int chars = Encoding.UTF8.GetChars(
      // 					evt.text.text,
      // 					bytes,
      // 					charsBuffer,
      // 					bytes
      // 				);

      // 				for (int i = 0; i < chars; i += 1)
      // 				{
      // 					TextInputEXT.OnTextInput(charsBuffer[i]);
      // 				}
      // 			}
      // 		}
      // 	}

      // 	// Quit
      // 	else if (evt.type == SDL.SDL_EventType.SDL_QUIT)
      // 	{
      // 		game.RunApplication = false;
      // 		break;
      // 	}
      // }
      // // Text Input Controls Key Handling
      // for (int i = 0; i < textInputCharacters.Length; i += 1)
      // {
      // 	if (textInputControlDown[i] && textInputControlRepeat[i] <= Environment.TickCount)
      // 	{
      // 		TextInputEXT.OnTextInput(textInputCharacters[i]);
      // 	}
      // }

      // Keyboard.SetKeys(keys);
      await game.Tick();
    }

    // Okay, we don't care about the events anymore
    //activeGames.Remove(game);

    // We out.
    game.Exit();
  }
};

/// <summary>
/// Defines types of surface formats.
/// </summary>
/*public*/ /*enum*/ ESurfaceFormat = {
  /// <summary>
  /// Unsigned 32-bit ARGB pixel format for store 8 bits per channel.
  /// </summary>
  Color: "ESurfaceFormat.Color",
  /// <summary>
  /// Unsigned 16-bit BGR pixel format for store 5 bits for blue, 6 bits for green, and 5 bits for red.
  /// </summary>
  Bgr565: "ESurfaceFormat.Bgr565",
  /// <summary>
  /// Unsigned 16-bit BGRA pixel format where 5 bits reserved for each color and last bit is reserved for alpha.
  /// </summary>
  Bgra5551: "ESurfaceFormat.Bgra5551",
  /// <summary>
  /// Unsigned 16-bit BGRA pixel format for store 4 bits per channel.
  /// </summary>
  Bgra4444: "ESurfaceFormat.Bgra4444",
  /// <summary>
  /// DXT1. Texture format with compression. Surface dimensions must be a multiple 4.
  /// </summary>
  Dxt1: "ESurfaceFormat.Dxt1",
  /// <summary>
  /// DXT3. Texture format with compression. Surface dimensions must be a multiple 4.
  /// </summary>
  Dxt3: "ESurfaceFormat.Dxt3",
  /// <summary>
  /// DXT5. Texture format with compression. Surface dimensions must be a multiple 4.
  /// </summary>
  Dxt5: "ESurfaceFormat.Dxt5",
  /// <summary>
  /// Signed 16-bit bump-map format for store 8 bits for <c>u</c> and <c>v</c> data.
  /// </summary>
  NormalizedByte2: "ESurfaceFormat.NormalizedByte2",
  /// <summary>
  /// Signed 16-bit bump-map format for store 8 bits per channel.
  /// </summary>
  NormalizedByte4: "ESurfaceFormat.NormalizedByte4",
  /// <summary>
  /// Unsigned 32-bit RGBA pixel format for store 10 bits for each color and 2 bits for alpha.
  /// </summary>
  Rgba1010102: "ESurfaceFormat.Rgba1010102",
  /// <summary>
  /// Unsigned 32-bit RG pixel format using 16 bits per channel.
  /// </summary>
  Rg32: "ESurfaceFormat.Rg32",
  /// <summary>
  /// Unsigned 64-bit RGBA pixel format using 16 bits per channel.
  /// </summary>
  Rgba64: "ESurfaceFormat.Rgba64",
  /// <summary>
  /// Unsigned A 8-bit format for store 8 bits to alpha channel.
  /// </summary>
  Alpha8: "ESurfaceFormat.Alpha8",
  /// <summary>
  /// IEEE 32-bit R float format for store 32 bits to red channel.
  /// </summary>
  Single: "ESurfaceFormat.Single",
  /// <summary>
  /// IEEE 64-bit RG float format for store 32 bits per channel.
  /// </summary>
  Vector2: "ESurfaceFormat.Vector2",
  /// <summary>
  /// IEEE 128-bit RGBA float format for store 32 bits per channel.
  /// </summary>
  Vector4: "ESurfaceFormat.Vector4",
  /// <summary>
  /// Float 16-bit R format for store 16 bits to red channel.
  /// </summary>
  HalfSingle: "ESurfaceFormat.HalfSingle",
  /// <summary>
  /// Float 32-bit RG format for store 16 bits per channel.
  /// </summary>
  HalfVector2: "ESurfaceFormat.HalfVector2",
  /// <summary>
  /// Float 64-bit ARGB format for store 16 bits per channel.
  /// </summary>
  HalfVector4: "ESurfaceFormat.HalfVector4",
  /// <summary>
  /// Float pixel format for high dynamic range data.
  /// </summary>
  HdrBlendable: "ESurfaceFormat.HdrBlendable",
  /// <summary>
  /// Unsigned 32-bit ABGR pixel format for store 8 bits per channel (XNA3)
  /// </summary>
  ColorBgraEXT: "ESurfaceFormat.ColorBgraEXT",
}

/// <summary>
/// Defines formats for depth-stencil buffer.
/// </summary>
/*public*/ /*enum*/ EDepthFormat = {
  /// <summary>
  /// Depth-stencil buffer will not be created.
  /// </summary>
  None: "EDepthFormat.None",
  /// <summary>
  /// 16-bit depth buffer.
  /// </summary>
  Depth16: "EDepthFormat.Depth16",
  /// <summary>
  /// 24-bit depth buffer.
  /// </summary>
  Depth24: "EDepthFormat.Depth24",
  /// <summary>
  /// 32-bit depth-stencil buffer. Where 24-bit depth and 8-bit for stencil used.
  /// </summary>
  Depth24Stencil8: "EDepthFormat.Depth24Stencil8",
}


/// <summary>
/// Defines how <see cref="GraphicsDevice.Present"/> updates the game window.
/// </summary>
EPresentInterval = {
  /// <summary>
  /// Equivalent to <see cref="PresentInterval.One"/>.
  /// </summary>
  Default: 0,
  /// <summary>
  /// The driver waits for the vertical retrace period, before updating window client area. Present operations are not affected more frequently than the screen refresh rate.
  /// </summary>
  One: 1,
  /// <summary>
  /// The driver waits for the vertical retrace period, before updating window client area. Present operations are not affected more frequently than every second screen refresh.
  /// </summary>
  Two: 2,
  /// <summary>
  /// The driver updates the window client area immediately. Present operations might be affected immediately. There is no limit for framerate.
  /// </summary>
  Immediate: 3,
}

/// <summary>
/// Defines the orientation of the display.
/// </summary>
// [Flags]
/*public*/ /*enum*/ EDisplayOrientation = {
  /// <summary>
  /// The default orientation.
  /// </summary>
  Default: 0,
  /// <summary>
  /// The display is rotated counterclockwise into a landscape orientation. Width is greater than height.
  /// </summary>
  LandscapeLeft: 1,
  /// <summary>
  /// The display is rotated clockwise into a landscape orientation. Width is greater than height.
  /// </summary>
  LandscapeRight: 2,
  /// <summary>
  /// The display is rotated as portrait, where height is greater than width.
  /// </summary>
  Portrait: 4
}



/// <summary>
/// Defines if the previous content in a render target is preserved when it set on the graphics device.
/// </summary>
ERenderTargetUsage = {
  /// <summary>
  /// The render target content will not be preserved.
  /// </summary>
  DiscardContents: "ERenderTargetUsage.DiscardContents",
  /// <summary>
  /// The render target content will be preserved even if it is slow or requires extra memory.
  /// </summary>
  PreserveContents: "ERenderTargetUsage.PreserveContents",
  /// <summary>
  /// The render target content might be preserved if the platform can do so without a penalty in performance or memory usage.
  /// </summary>
  PlatformContents: "ERenderTargetUsage.PlatformContents",
}

/// <summary>
/// Defines a set of graphic capabilities.
/// </summary>
/*public*/ /*enum*/ EGraphicsProfile = {
  /// <summary>
  /// Use a limited set of graphic features and capabilities, allowing the game to support the widest variety of devices.
  /// </summary>
  Reach: "EGraphicsProfile.Reach",
  /// <summary>
  /// Use the largest available set of graphic features and capabilities to target devices, that have more enhanced graphic capabilities.
  /// </summary>
  HiDef: "EGraphicsProfile.HiDef",
}

CGraphicsDeviceInformation = class CGraphicsDeviceInformation {
};


CGraphicsAdapter = class CGraphicsAdapter {
  constructor()
  {
    this.DeviceName = "Default";
  }
  static get DefaultAdapter()
  {
    return new CGraphicsAdapter();
  }
};

CTextureCollection = class CTextureCollection {
};

CSamplerStateCollection = class CSamplerStateCollection {
};

CGraphicsDevice = class CGraphicsDevice {
  // Per XNA4 General Spec
  //internal const int MAX_TEXTURE_SAMPLERS = 16;
  get MAX_TEXTURE_SAMPLERS() { return 16; }

  // Per XNA4 HiDef Spec
  //internal const int MAX_VERTEX_ATTRIBUTES = 16;
  //internal const int MAX_RENDERTARGET_BINDINGS = 4;
  //internal const int MAX_VERTEXTEXTURE_SAMPLERS = 4;
  get MAX_VERTEX_ATTRIBUTES() { return 16; }
  get MAX_RENDERTARGET_BINDINGS() { return 4; }
  get MAX_VERTEXTEXTURE_SAMPLERS() { return 4; }


  constructor(
    /*GraphicsAdapter*/ adapter,
    /*GraphicsProfile*/ graphicsProfile,
    /*PresentationParameters*/ presentationParameters
  ) {
    if (presentationParameters == null)
    {
      throw new CArgumentNullException("presentationParameters");
    }

		// We never lose devices, but lol XNA4 compliance -flibit
		// public event EventHandler<EventArgs> DeviceLost;
		// public event EventHandler<EventArgs> DeviceReset;
		// public event EventHandler<EventArgs> DeviceResetting;
		// public event EventHandler<ResourceCreatedEventArgs> ResourceCreated;
		// public event EventHandler<ResourceDestroyedEventArgs> ResourceDestroyed;
		// public event EventHandler<EventArgs> Disposing;
    this.DeviceLost = new EventHandler();
    this.DeviceReset = new EventHandler();
    this.DeviceResetting = new EventHandler();
    this.ResourceCreated = new EventHandler();
    this.ResourceDestroyed = new EventHandler();
    this.Disposing = new EventHandler();

    // Set the properties from the constructor parameters.
    this.Adapter = adapter;
    this.PresentationParameters = presentationParameters;
    this.GraphicsProfile = graphicsProfile;
    this.PresentationParameters.MultiSampleCount = CMathHelper.ClosestMSAAPower(
      this.PresentationParameters.MultiSampleCount
    );

    // Set up the IGLDevice
    this.GLDevice = CFNAPlatform.CreateGLDevice(this.PresentationParameters, adapter);

    if (typeof CInput !== 'undefined') {
      // The mouse needs to know this for faux-backbuffer mouse scaling.
      Input.Mouse.INTERNAL_BackBufferWidth = PresentationParameters.BackBufferWidth;
      Input.Mouse.INTERNAL_BackBufferHeight = PresentationParameters.BackBufferHeight;

      // The Touch Panel needs this too, for the same reason.
      Input.Touch.TouchPanel.DisplayWidth = PresentationParameters.BackBufferWidth;
      Input.Touch.TouchPanel.DisplayHeight = PresentationParameters.BackBufferHeight;
    }

    // Force set the default render states.
    if (typeof CBlendState !== 'undefined') // TODO
      this.BlendState = CBlendState.Opaque;
    if (typeof CDepthStencilState !== 'undefined') // TODO
      this.DepthStencilState = CDepthStencilState.Default;
    if (typeof CRasterizerState !== 'undefined') // TODO
      this.RasterizerState = CRasterizerState.CullCounterClockwise;

    // Initialize the Texture/Sampler state containers
    /*int*/ let maxTextures = CMath.Min(this.GLDevice.MaxTextureSlots, this.MAX_TEXTURE_SAMPLERS);
    /*int*/ let maxVertexTextures = CMathHelper.Clamp(
      this.GLDevice.MaxTextureSlots - this.MAX_TEXTURE_SAMPLERS,
      0,
      this.MAX_VERTEXTEXTURE_SAMPLERS
    );
    this.vertexSamplerStart = this.GLDevice.MaxTextureSlots - maxVertexTextures;
    this.Textures = new CTextureCollection(
      maxTextures,
      this.modifiedSamplers
    );
    this.SamplerStates = new CSamplerStateCollection(
      maxTextures,
      this.modifiedSamplers
    );
    this.VertexTextures = new CTextureCollection(
      maxVertexTextures,
      this.modifiedVertexSamplers
    );
    this.VertexSamplerStates = new CSamplerStateCollection(
      maxVertexTextures,
      this.modifiedVertexSamplers
    );

    // Set the default viewport and scissor rect.
    this.Viewport = new CViewport(this.PresentationParameters.Bounds);
    this.ScissorRectangle = this.Viewport.Bounds;
  }

  /*public*/ /*void*/ Reset(
    /*PresentationParameters*/ presentationParameters,
    /*GraphicsAdapter*/ graphicsAdapter
  ) {
    if (presentationParameters == null)
    {
      throw new CArgumentNullException("presentationParameters");
    }
    this.PresentationParameters = presentationParameters;
    this.Adapter = graphicsAdapter;

    // Verify MSAA before we really start...
    this.PresentationParameters.MultiSampleCount = CMath.Min(
      CMathHelper.ClosestMSAAPower(
        this.PresentationParameters.MultiSampleCount
      ),
      (this.GLDevice != null) ? this.GLDevice.MaxMultiSampleCount : 1
    );

    // We're about to reset, let the application know.
    if (this.DeviceResetting != null)
    {
      this.DeviceResetting(this, CEventArgs.Empty);
    }

    /* FIXME: Why are we not doing this...? -flibit
    lock (resourcesLock)
    {
      foreach (WeakReference resource in resources)
      {
        object target = resource.Target;
        if (target != null)
        {
          (target as GraphicsResource).GraphicsDeviceResetting();
        }
      }

      // Remove references to resources that have been garbage collected.
      resources.RemoveAll(wr => !wr.IsAlive);
    }
    */

    /* Reset the backbuffer first, before doing anything else.
     * The GLDevice needs to know what we're up to right away.
     * -flibit
     */
    if (this.GLDevice != null) {
      this.GLDevice.ResetBackbuffer(
        this.PresentationParameters,
        this.Adapter,
        this.RenderTargetCount > 0
      );
    }

    if (typeof CInput !== 'undefined') {
    // The mouse needs to know this for faux-backbuffer mouse scaling.
    CInput.Mouse.INTERNAL_BackBufferWidth = this.PresentationParameters.BackBufferWidth;
    CInput.Mouse.INTERNAL_BackBufferHeight = this.PresentationParameters.BackBufferHeight;

    // The Touch Panel needs this too, for the same reason.
    CInput.Touch.TouchPanel.DisplayWidth = this.PresentationParameters.BackBufferWidth;
    CInput.Touch.TouchPanel.DisplayHeight = this.PresentationParameters.BackBufferHeight;
    }

// #if WIIU_GAMEPAD
//     wiiuPixelData = new byte[
//       this.PresentationParameters.BackBufferWidth *
//       this.PresentationParameters.BackBufferHeight *
//       4
//     ];
// #endif

    // Now, update the viewport
    this.Viewport = new CViewport(
      0,
      0,
      this.PresentationParameters.BackBufferWidth,
      this.PresentationParameters.BackBufferHeight
    );

    // Update the scissor rectangle to our new default target size
    this.ScissorRectangle = new CRectangle(
      0,
      0,
      this.PresentationParameters.BackBufferWidth,
      this.PresentationParameters.BackBufferHeight
    );

    // We just reset, let the application know.
    if (this.DeviceReset != null)
    {
      this.DeviceReset(this, CEventArgs.Empty);
    }
  }

  // TODO: Hook this up to GraphicsResource
  /*internal*/ /*void*/ OnResourceCreated()
  {
    if (this.ResourceCreated != null)
    {
      this.ResourceCreated(this, /*(ResourceCreatedEventArgs)*/ CEventArgs.Empty);
    }
  }

  // TODO: Hook this up to GraphicsResource
  /*internal*/ /*void*/ OnResourceDestroyed()
  {
    if (this.ResourceDestroyed != null)
    {
      this.ResourceDestroyed(this, /*(ResourceDestroyedEventArgs)*/ CEventArgs.Empty);
    }
  }

};

CPreparingDeviceSettingsEventArgs = class CPreparingDeviceSettingsEventArgs {
  constructor(gdi) {
    this.gdi = gdi;
  }
};

CGraphicsDeviceManager = class CGraphicsDeviceManager {
  static get DefaultBackBufferWidth()
  {
    return 800;
  }

  static get DefaultBackBufferHeight()
  {
    return 600;
  }

  /*public*/ /*GraphicsDeviceManager*/ constructor(/*Game*/ game)
  {
    if (game == null)
    {
      throw new CArgumentNullException("The game cannot be null!");
    }

    this.game = game;


    /*
		public event EventHandler<EventArgs> Disposed;
		public event EventHandler<EventArgs> DeviceCreated;
		public event EventHandler<EventArgs> DeviceDisposing;
		public event EventHandler<EventArgs> DeviceReset;
		public event EventHandler<EventArgs> DeviceResetting;
		public event EventHandler<PreparingDeviceSettingsEventArgs> PreparingDeviceSettings;
    */
    this.Disposed = new EventHandler();
    this.DeviceCreated = new EventHandler();
    this.DeviceDisposing = new EventHandler();
    this.DeviceReset = new EventHandler();
    this.DeviceResetting = new EventHandler();
    this.PreparingDeviceSettings = new EventHandler();


    this.GraphicsProfile = EGraphicsProfile.HiDef;
    this.graphicsDevice = null;

    this.supportedOrientations = EDisplayOrientation.Default;

    this.PreferredBackBufferHeight = CGraphicsDeviceManager.DefaultBackBufferHeight;
    this.PreferredBackBufferWidth = CGraphicsDeviceManager.DefaultBackBufferWidth;

    this.PreferredBackBufferFormat = ESurfaceFormat.Color;
    this.PreferredDepthStencilFormat = EDepthFormat.Depth24;

    this.SynchronizeWithVerticalRetrace = true;

    this.PreferMultiSampling = false;

    if (game.Services.GetService(/*typeof*/("IGraphicsDeviceManager")) != null)
    {
      throw new CArgumentException("Graphics Device Manager Already Present");
    }

    game.Services.AddService(/*typeof*/("IGraphicsDeviceManager"), this);
    game.Services.AddService(/*typeof*/("IGraphicsDeviceService"), this);

    this.useResizedBackBuffer = false;
    game.Window.ClientSizeChanged["+="](this.INTERNAL_OnClientSizeChanged, this);
  }


  /*public*/ /*GraphicsDevice*/ get GraphicsDevice()
  {
    /* FIXME: If you call this before CGame.Initialize(), you can
     * actually get a device in XNA4. But, even in XNA4, Game.Run
     * is what calls CreateDevice! So is this check accurate?
     * -flibit
     */
    if (this.graphicsDevice == null)
    {
      (/*(IGraphicsDeviceManager)*/ this).CreateDevice();
    }
    return this.graphicsDevice;
  }


  /*void*/ /*IGraphicsDeviceManager.*/ CreateDevice()
  {
    // Set the default device information
    /*GraphicsDeviceInformation*/ let gdi = new CGraphicsDeviceInformation();
    gdi.Adapter = CGraphicsAdapter.DefaultAdapter;
    gdi.GraphicsProfile = this.GraphicsProfile;
    gdi.PresentationParameters = new CPresentationParameters();
    gdi.PresentationParameters.DeviceWindowHandle = this.game.Window.Handle;
    gdi.PresentationParameters.DepthStencilFormat = this.PreferredDepthStencilFormat;
    gdi.PresentationParameters.IsFullScreen = false;

    // Give the user a chance to change the initial settings
    this.OnPreparingDeviceSettings(
      this,
      new CPreparingDeviceSettingsEventArgs(gdi)
    );

    // Apply these settings to this GraphicsDeviceManager
    this.GraphicsProfile = gdi.GraphicsProfile;
    this.PreferredBackBufferFormat = gdi.PresentationParameters.BackBufferFormat;
    this.PreferredDepthStencilFormat = gdi.PresentationParameters.DepthStencilFormat;

    // Create the GraphicsDevice, hook the callbacks
    this.graphicsDevice = new CGraphicsDevice(
      gdi.Adapter,
      gdi.GraphicsProfile,
      gdi.PresentationParameters
    );
    this.graphicsDevice.Disposing["+="](this.OnDeviceDisposing, this);
    this.graphicsDevice.DeviceResetting["+="](this.OnDeviceResetting, this);
    this.graphicsDevice.DeviceReset["+="](this.OnDeviceReset, this);

    // Set device defaults
    this.ApplyChanges();

    // Call the DeviceCreated Event
    this.OnDeviceCreated(this, CEventArgs.Empty);
  }

  /*public*/ /*void*/ ApplyChanges()
  {
    // Calling ApplyChanges() before CreateDevice() should have no effect.
    if (this.graphicsDevice == null)
    {
      return;
    }

    // Recreate device information before resetting
    /*GraphicsDeviceInformation*/ let gdi = new CGraphicsDeviceInformation();
    gdi.Adapter = this.GraphicsDevice.Adapter;
    gdi.GraphicsProfile = this.GraphicsDevice.GraphicsProfile;
    gdi.PresentationParameters = this.GraphicsDevice.PresentationParameters.Clone();

    /* Apply the GraphicsDevice changes to the new Parameters.
     * Note that PreparingDeviceSettings can override any of these!
     * -flibit
     */
    gdi.PresentationParameters.BackBufferFormat =
      this.PreferredBackBufferFormat;
    if (this.useResizedBackBuffer)
    {
      gdi.PresentationParameters.BackBufferWidth = this.resizedBackBufferWidth;
      gdi.PresentationParameters.BackBufferHeight = this.resizedBackBufferHeight;
      this.useResizedBackBuffer = false;
    }
    else
    {
      if (!CFNAPlatform.SupportsOrientationChanges())
      {
        gdi.PresentationParameters.BackBufferWidth = this.PreferredBackBufferWidth;
        gdi.PresentationParameters.BackBufferHeight = this.PreferredBackBufferHeight;
      }
      else
      {
        /* Flip the backbuffer dimensions to scale
         * appropriately to the current orientation.
         */
        /*int*/ let min = CMath.Min(this.PreferredBackBufferWidth, this.PreferredBackBufferHeight);
        /*int*/ let max = CMath.Max(this.PreferredBackBufferWidth, this.PreferredBackBufferHeight);

        if (gdi.PresentationParameters.DisplayOrientation == EDisplayOrientation.Portrait)
        {
          gdi.PresentationParameters.BackBufferWidth = min;
          gdi.PresentationParameters.BackBufferHeight = max;
        }
        else
        {
          gdi.PresentationParameters.BackBufferWidth = max;
          gdi.PresentationParameters.BackBufferHeight = min;
        }
      }
    }
    gdi.PresentationParameters.DepthStencilFormat = this.PreferredDepthStencilFormat;
    gdi.PresentationParameters.IsFullScreen = this.IsFullScreen;
    if (!this.PreferMultiSampling)
    {
      gdi.PresentationParameters.MultiSampleCount = 0;
    }
    else if (gdi.PresentationParameters.MultiSampleCount === 0)
    {
      /* XNA4 seems to have an upper limit of 8, but I'm willing to
       * limit this only in GraphicsDeviceManager's default setting.
       * If you want even higher values, Reset() with a custom value.
       * -flibit
       */
      gdi.PresentationParameters.MultiSampleCount = CMath.Min(
        this.GraphicsDevice.GLDevice.MaxMultiSampleCount,
        8
      );
    }

    // Give the user a chance to override the above settings.
    this.OnPreparingDeviceSettings(
      this,
      new CPreparingDeviceSettingsEventArgs(gdi)
    );

    // Reset!
    this.game.Window.BeginScreenDeviceChange(
      gdi.PresentationParameters.IsFullScreen
    );
    this.game.Window.EndScreenDeviceChange(
      gdi.Adapter.DeviceName,
      gdi.PresentationParameters.BackBufferWidth,
      gdi.PresentationParameters.BackBufferHeight
    );
    // FIXME: This should be before EndScreenDeviceChange! -flibit
    this.GraphicsDevice.Reset(
      gdi.PresentationParameters,
      gdi.Adapter
    );

    // Apply the PresentInterval.
    CFNAPlatform.SetPresentationInterval(
      this.SynchronizeWithVerticalRetrace ?
        gdi.PresentationParameters.PresentationInterval :
        EPresentInterval.Immediate
    );
  }

  /*protected*/ /*virtual*/ /*void*/ OnDeviceCreated(/*object*/ sender, /*EventArgs*/ args)
  {
    if (this.DeviceCreated != null)
    {
      this.DeviceCreated(sender, args);
    }
  }

  /*protected*/ /*virtual*/ /*void*/ OnDeviceDisposing(/*object*/ sender, /*EventArgs*/ args)
  {
    if (this.DeviceDisposing != null)
    {
      this.DeviceDisposing(sender, args);
    }
  }

  /*protected*/ /*virtual*/ /*void*/ OnDeviceReset(/*object*/ sender, /*EventArgs*/ args)
  {
    if (this.DeviceReset != null)
    {
      this.DeviceReset(sender, args);
    }
  }

  /*protected*/ /*virtual*/ /*void*/ OnDeviceResetting(/*object*/ sender, /*EventArgs*/ args)
  {
    if (this.DeviceResetting != null)
    {
      this.DeviceResetting(sender, args);
    }
  }

  /*protected*/ /*virtual*/ /*void*/ OnPreparingDeviceSettings(
    /*object*/ sender,
    /*PreparingDeviceSettingsEventArgs*/ args
  ) {
    if (this.PreparingDeviceSettings != null)
    {
      this.PreparingDeviceSettings(sender, args);
    }
  }
};

CPresentationParameters = class CPresentationParameters {
  get Bounds()
  {
    return new CRectangle(0, 0, this.BackBufferWidth, this.BackBufferHeight);
  }

  constructor()
  {
    this.BackBufferFormat = ESurfaceFormat.Color;
    this.BackBufferWidth = CGraphicsDeviceManager.DefaultBackBufferWidth;
    this.BackBufferHeight = CGraphicsDeviceManager.DefaultBackBufferHeight;
    this.DeviceWindowHandle = null;//IntPtr.Zero;
    this.IsFullScreen = false; // FIXME: Is this the default?
    this.DepthStencilFormat = EDepthFormat.None;
    this.MultiSampleCount = 0;
    this.PresentationInterval = EPresentInterval.Default;
    this.DisplayOrientation = EDisplayOrientation.Default;
    this.RenderTargetUsage = ERenderTargetUsage.DiscardContents;
  }

  /*public*/ /*PresentationParameters*/ Clone()
  {
    /*CPresentationParameters*/ let clone = new CPresentationParameters();
    clone.BackBufferFormat = this.BackBufferFormat;
    clone.BackBufferHeight = this.BackBufferHeight;
    clone.BackBufferWidth = this.BackBufferWidth;
    clone.DeviceWindowHandle = this.DeviceWindowHandle;
    clone.IsFullScreen = this.IsFullScreen;
    clone.DepthStencilFormat = this.DepthStencilFormat;
    clone.MultiSampleCount = this.MultiSampleCount;
    clone.PresentationInterval = this.PresentationInterval;
    clone.DisplayOrientation = this.DisplayOrientation;
    clone.RenderTargetUsage = this.RenderTargetUsage;
    return clone;
  }
};

/// <summary>
/// Defines sprite sort rendering options.
/// </summary>
ESpriteSortMode = {
  /// <summary>
  /// All sprites are drawing when <see cref="SpriteBatch.End"/> invokes, in order of draw call sequence. Depth is ignored.
  /// </summary>
  Deferred: 0,
  /// <summary>
  /// Each sprite is drawing at individual draw call, instead of <see cref="SpriteBatch.End"/>. Depth is ignored.
  /// </summary>
  Immediate: 1,
  /// <summary>
  /// Same as <see cref="SpriteSortMode.Deferred"/>, except sprites are sorted by texture prior to drawing. Depth is ignored.
  /// </summary>
  Texture: 2,
  /// <summary>
  /// Same as <see cref="SpriteSortMode.Deferred"/>, except sprites are sorted by depth in back-to-front order prior to drawing.
  /// </summary>
  BackToFront: 3,
  /// <summary>
  /// Same as <see cref="SpriteSortMode.Deferred"/>, except sprites are sorted by depth in front-to-back order prior to drawing.
  /// </summary>
  FrontToBack: 4
}


CSpriteBatch = class CSpriteBatch {

  // As defined by the HiDef profile spec
  //private const int MAX_SPRITES = 2048;
  //private const int MAX_VERTICES = MAX_SPRITES * 4;
  //private const int MAX_INDICES = MAX_SPRITES * 6;
  static get MAX_SPRITES() { return 2048; }
  static get MAX_VERTICES() { return CSpriteBatch.MAX_SPRITES * 4; }
  static get MAX_INDICES() { return CSpriteBatch.MAX_SPRITES * 6; }

  /*public*/ /*SpriteBatch*/ constructor(/*GraphicsDevice*/ graphicsDevice)
  {
    // if (graphicsDevice == null)
    // {
    //   throw new CArgumentNullException("graphicsDevice");
    // }
    this.GraphicsDevice = graphicsDevice;

//     this.vertexInfo = new VertexPositionColorTexture4[MAX_SPRITES];
//     this.textureInfo = new Texture2D[MAX_SPRITES];
//     this.spriteInfos = new SpriteInfo[MAX_SPRITES];
//     this.sortedSpriteInfos = new IntPtr[MAX_SPRITES];
//     this.vertexBuffer = new DynamicVertexBuffer(
//       graphicsDevice,
//       typeof(VertexPositionColorTexture),
//       MAX_VERTICES,
//       BufferUsage.WriteOnly
//     );
//     this.indexBuffer = new IndexBuffer(
//       graphicsDevice,
//       IndexElementSize.SixteenBits,
//       MAX_INDICES,
//       BufferUsage.WriteOnly
//     );
//     indexBuffer.SetData(indexData);

//     this.spriteEffect = new Effect(
//       graphicsDevice,
//       spriteEffectCode
//     );
//     this.spriteMatrixTransform = spriteEffect.Parameters["MatrixTransform"].values;
//     this.spriteEffectPass = spriteEffect.CurrentTechnique.Passes[0];

    this.beginCalled = false;
    this.numSprites = 0;
  }


  /*public*/ /*void*/ Draw(
    /*Texture2D*/ texture,
    /*Vector2*/ position,
    /*Rectangle?*/ sourceRectangle,
    /*Color*/ color,
    /*float*/ rotation,
    /*Vector2*/ origin,
    /*float*/ scale,
    /*SpriteEffects*/ effects,
    /*float*/ layerDepth
  ) {
    this.CheckBegin("Draw");
    /*float*/ let sourceX, sourceY, sourceW, sourceH;
    /*float*/ let destW = scale;
    /*float*/ let destH = scale;
    if (sourceRectangle != null)
    {
      sourceX = sourceRectangle.X / /*(float)*/ texture.Width;
      sourceY = sourceRectangle.Y / /*(float)*/ texture.Height;
      sourceW = CMath.Sign(sourceRectangle.Width) * CMath.Max(
        CMath.Abs(sourceRectangle.Width),
        CMathHelper.MachineEpsilonFloat
      ) / /*(float)*/ texture.Width;
      sourceH = CMath.Sign(sourceRectangle.Height) * CMath.Max(
        CMath.Abs(sourceRectangle.Height),
        CMathHelper.MachineEpsilonFloat
      ) / /*(float)*/ texture.Height;
      destW *= sourceRectangle.Width;
      destH *= sourceRectangle.Height;
    }
    else
    {
      sourceX = 0.0;
      sourceY = 0.0;
      sourceW = 1.0;
      sourceH = 1.0;
      destW *= texture.Width;
      destH *= texture.Height;
    }
    this.PushSprite(
      texture,
      sourceX,
      sourceY,
      sourceW,
      sourceH,
      position.X,
      position.Y,
      destW,
      destH,
      color,
      origin.X / sourceW / /*(float)*/ texture.Width,
      origin.Y / sourceH / /*(float)*/ texture.Height,
      /*(float)*/ CMath.Sin(rotation),
      /*(float)*/ CMath.Cos(rotation),
      layerDepth,
      /*(byte)*/ (effects & /*(ESpriteEffects)*/ 0x03)
    );
  }

  /*private*/ /*unsafe*/ /*void*/ PushSprite(
    /*Texture2D*/ texture,
    /*float*/ sourceX,
    /*float*/ sourceY,
    /*float*/ sourceW,
    /*float*/ sourceH,
    /*float*/ destinationX,
    /*float*/ destinationY,
    /*float*/ destinationW,
    /*float*/ destinationH,
    /*Color*/ color,
    /*float*/ originX,
    /*float*/ originY,
    /*float*/ rotationSin,
    /*float*/ rotationCos,
    /*float*/ depth,
    /*byte*/ effects
  ) {
    if (this.numSprites >= CSpriteBatch.MAX_SPRITES)
    {
      // Oh crap, we're out of space, flush!
      this.FlushBatch();
    }

    if (this.sortMode === ESpriteSortMode.Immediate)
    {
      //fixed (VertexPositionColorTexture4* sprite = &vertexInfo[0])
      {
        let sprite = this.vertexInfo;
        this.GenerateVertexInfo(
          sprite,
          sourceX,
          sourceY,
          sourceW,
          sourceH,
          destinationX,
          destinationY,
          destinationW,
          destinationH,
          color,
          originX,
          originY,
          rotationSin,
          rotationCos,
          depth,
          effects
        );

        /* We do NOT use Discard here because
         * it would be stupid to reallocate the
         * whole buffer just for one sprite.
         *
         * Unless you're using this to blit a
         * target, stop using Immediate ya donut
         * -flibit
         */
        this.vertexBuffer.SetDataPointerEXT(
          0,
          /*(IntPtr)*/ sprite,
          VertexPositionColorTexture4.RealStride,
          SetDataOptions.None
        );
      }
      this.DrawPrimitives(texture, 0, 1);
    }
    else if (sortMode == SpriteSortMode.Deferred)
    {
      //fixed (VertexPositionColorTexture4* sprite = &vertexInfo[numSprites])
      {
        let sprite = this.vertexInfo[this.numSprites];
        this.GenerateVertexInfo(
          sprite,
          sourceX,
          sourceY,
          sourceW,
          sourceH,
          destinationX,
          destinationY,
          destinationW,
          destinationH,
          color,
          originX,
          originY,
          rotationSin,
          rotationCos,
          depth,
          effects
        );
      }

      textureInfo[numSprites] = texture;
      numSprites += 1;
    }
    else
    {
      //fixed (SpriteInfo* spriteInfo = &spriteInfos[numSprites])
      {
        let spriteInfo = this.spriteInfos[this.numSprites];
        spriteInfo.textureHash = texture.GetHashCode();
        spriteInfo.sourceX = sourceX;
        spriteInfo.sourceY = sourceY;
        spriteInfo.sourceW = sourceW;
        spriteInfo.sourceH = sourceH;
        spriteInfo.destinationX = destinationX;
        spriteInfo.destinationY = destinationY;
        spriteInfo.destinationW = destinationW;
        spriteInfo.destinationH = destinationH;
        spriteInfo.color = color;
        spriteInfo.originX = originX;
        spriteInfo.originY = originY;
        spriteInfo.rotationSin = rotationSin;
        spriteInfo.rotationCos = rotationCos;
        spriteInfo.depth = depth;
        spriteInfo.effects = effects;
      }

      textureInfo[numSprites] = texture;
      numSprites += 1;
    }
  }

  /*private*/ /*unsafe*/ /*void*/ FlushBatch()
  {
    /*int*/ let offset = 0;
    /*Texture2D*/ let curTexture = null;

    this.PrepRenderState();

    if (this.numSprites == 0)
    {
      // Nothing to do.
      return;
    }

    if (this.sortMode !== ESpriteSortMode.Deferred)
    {
      /*IComparer<IntPtr>*/ let comparer;
      if (this.sortMode === ESpriteSortMode.Texture)
      {
        comparer = TextureCompare;
      }
      else if (this.sortMode === SpriteSortMode.BackToFront)
      {
        comparer = BackToFrontCompare;
      }
      else
      {
        comparer = FrontToBackCompare;
      }
      //fixed (SpriteInfo* spriteInfo = &spriteInfos[0])
      {
        let spriteInfo = this.spriteInfos;
        //fixed (IntPtr* sortedSpriteInfo = &sortedSpriteInfos[0])
        {
          let sortedSpriteInfo = this.sortedSpriteInfo;
          //fixed (VertexPositionColorTexture4* sprites = &vertexInfo[0])
          {
            let sprites = this.vertexInfo;
            for (/*int*/ let i = 0; i < this.numSprites; i += 1)
            {
              sortedSpriteInfo[i] = spriteInfo[i]; //(IntPtr) (&spriteInfo[i]);
            }
            CArray.Sort(
              sortedSpriteInfos,
              textureInfo,
              0,
              numSprites,
              comparer
            );
            for (/*int*/ let i = 0; i < this.numSprites; i += 1)
            {
              //SpriteInfo* info = (SpriteInfo*) sortedSpriteInfo[i];
              let info = this.sortedSpriteInfo[i];
              this.GenerateVertexInfo(
                sprites[i],
                info.sourceX,
                info.sourceY,
                info.sourceW,
                info.sourceH,
                info.destinationX,
                info.destinationY,
                info.destinationW,
                info.destinationH,
                info.color,
                info.originX,
                info.originY,
                info.rotationSin,
                info.rotationCos,
                info.depth,
                info.effects
              );
            }
          }
        }
      }
    }

    //fixed (VertexPositionColorTexture4* p = &vertexInfo[0])
    {
      let p = this.vertexInfo;
      /* We use Discard here because the last batch
       * may still be executing, and we can't always
       * trust the driver to use a staging buffer for
       * buffer uploads that overlap between commands.
       *
       * If you aren't using the whole vertex buffer,
       * that's your own fault. Use the whole buffer!
       * -flibit
       */
      vertexBuffer.SetDataPointerEXT(
        0,
        /*(IntPtr)*/ p,
        numSprites * VertexPositionColorTexture4.RealStride,
        SetDataOptions.Discard
      );
    }

    curTexture = textureInfo[0];
    for (/*int*/ let i = 1; i < numSprites; i += 1)
    {
      if (textureInfo[i] != curTexture)
      {
        this.DrawPrimitives(curTexture, offset, i - offset);
        curTexture = textureInfo[i];
        offset = i;
      }
    }
    this.DrawPrimitives(curTexture, offset, numSprites - offset);

    this.numSprites = 0;
  }
};
