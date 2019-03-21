
CPath = class CPath
{
  static get trimEndCharsWindows()
  {
    return CPath._trimEndCharsWindows ||
      (CPath._trimEndCharsWindows = [
        '\t',
        '\n',
        '\v',
        '\f',
        '\r',
        ' ',
        '\x85',
        ' ',
      ]);
  }

  static get trimEndCharsUnix()
  {
    return [];
  }

  static get VolumeSeparatorChar() { return CEnvironment.IsRunningOnWindows ? ':\\' : '//'; }
  static get DirectorySeparatorChar() { return CEnvironment.IsRunningOnWindows ? '\\' : '/'; }
  static get AltDirectorySeparatorChar() { return CEnvironment.IsRunningOnWindows ? '/' : '\\'; }
  static get PathSeparator() { return CEnvironment.IsRunningOnWindows ? ';' : ':'; }

  static get DirectorySeparatorStr() { return CPath.DirectorySeparatorChar; }

  static get PathSeparatorChars() {
    return [
      CPath.DirectorySeparatorChar,
      CPath.AltDirectorySeparatorChar,
      CPath.VolumeSeparatorChar,
    ];
  }

  static ChangeExtension(path, extension)
  {
    if (Fnull(path))
      return null;
    if (FIndexOfAny(path, CPath.InvalidPathChars) !== -1)
      throw new CArgumentException("Illegal characters in path.");
    var extension1 = CPath.findExtension(path);
    if (Fnull(extension))
    {
      if (extension1 >= 0)
        return FSubstring(path, 0, extension1);
      return path;
    }
    if (FLength(extension) === 0)
    {
      if (extension1 >= 0)
        return FSubstring(path, 0, extension1 + 1);
      return path + ".";
    }
    if (FLength(path) !== 0)
    {
      if (FLength(extension) > 0 && extension[0] !== '.')
        extension = "." + extension;
    }
    else
      extension = Cstring.Empty;
    if (extension1 < 0)
      return path + extension;
    if (extension1 > 0)
      return FSubstring(path, 0, extension1) + extension;
    return extension;
  }

  static Combine(path1, path2) {
    if (Fnull(path1))
      throw new CArgumentNullException(Fnameof (path1, "path1"));
    if (Fnull(path2))
      throw new CArgumentNullException(Fnameof (path2, "path2"));
    if (FLength(path1) === 0)
      return path2;
    if (FLength(path2) === 0)
      return path1;
    if (FIndexOfAny(path1, CPath.InvalidPathChars) !== -1)
      throw new CArgumentException("Illegal characters in path.");
    if (FIndexOfAny(path2, CPath.InvalidPathChars) !== -1)
      throw new CArgumentException("Illegal characters in path.");
    if (CPath.IsPathRooted(path2))
      return path2;
    var ch = path1[FLength(path1) - 1];
    if (FcharToInt(ch) !== FcharToInt(CPath.DirectorySeparatorChar) && FcharToInt(ch) !== FcharToInt(CPath.AltDirectorySeparatorChar) && FcharToInt(ch) !== FcharToInt(CPath.VolumeSeparatorChar))
      return path1 + CPath.DirectorySeparatorStr + path2;
    return path1 + path2;
  }

  static get InvalidPathChars() {
    return CPath._InvalidPathChars || (CPath._InvalidPathChars = CPath.GetInvalidPathChars());
  }

  static CleanPath(s)
  {
    var length = FLength(s);
    var num1 = 0;
    var num2 = 0;
    var num3 = 0;
    var ch1 = s[0];
    if (length > 2 && ch1 === '\\' && s[1] === '\\')
      num3 = 2;
    if (length === 1 && (FcharToInt(ch1) === FcharToInt(CPath.DirectorySeparatorChar) || FcharToInt(ch1) === FcharToInt(CPath.AltDirectorySeparatorChar)))
      return s;
    for (let index = num3; index < length; ++index)
    {
      var ch2 = s[index];
      if (FcharToInt(ch2) === FcharToInt(CPath.DirectorySeparatorChar) || FcharToInt(ch2) === FcharToInt(CPath.AltDirectorySeparatorChar))
      {
        if (FcharToInt(CPath.DirectorySeparatorChar) !== FcharToInt(CPath.AltDirectorySeparatorChar) && FcharToInt(ch2) === FcharToInt(CPath.AltDirectorySeparatorChar))
          ++num2;
        if (index + 1 === length)
        {
          ++num1;
        }
        else
        {
          var ch3 = s[index + 1];
          if (FcharToInt(ch3) === FcharToInt(CPath.DirectorySeparatorChar) || FcharToInt(ch3) === FcharToInt(CPath.AltDirectorySeparatorChar))
            ++num1;
        }
      }
    }
    if (num1 === 0 && num2 === 0)
      return s;
    var chArray = Fnewchar(length - num1);
    if (num3 !== 0)
    {
      chArray[0] = '\\';
      chArray[1] = '\\';
    }
    var index1 = num3;
    for (let index2 = num3; index1 < length && index2 < FLength(chArray); ++index1)
    {
      var ch2 = s[index1];
      if (FcharToInt(ch2) !== FcharToInt(CPath.DirectorySeparatorChar) && FcharToInt(ch2) !== FcharToInt(CPath.AltDirectorySeparatorChar))
        chArray[index2++] = ch2;
      else if (index2 + 1 !== FLength(chArray))
      {
        chArray[index2++] = CPath.DirectorySeparatorChar;
        for (; index1 < length - 1; ++index1)
        {
          var ch3 = s[index1 + 1];
          if (FcharToInt(ch3) !== FcharToInt(CPath.DirectorySeparatorChar) && FcharToInt(ch3) !== FcharToInt(CPath.AltDirectorySeparatorChar))
            break;
        }
      }
    }
    return Fnewstring(chArray);
  }

  static GetDirectoryName(path)
  {
    if (path === Cstring.Empty)
      throw new CArgumentException("Invalid path");
    if (Fnull(path) || CPath.GetPathRoot(path) === path)
      return null;
    if (FLength(FTrim(path)) === 0)
      throw new CArgumentException("Argument string consists of whitespace characters only.");
    if (FIndexOfAny(path, CPath.InvalidPathChars) > -1)
      throw new CArgumentException("Path contains invalid characters");
    var length1 = FLastIndexOfAny(path, CPath.PathSeparatorChars);
    if (length1 === 0)
      ++length1;
    if (length1 <= 0)
      return Cstring.Empty;
    var s = FSubstring(path, 0, length1);
    var length2 = FLength(s);
    if (length2 >= 2 && CPath.DirectorySeparatorChar === '\\' && FcharToInt(s[length2 - 1]) === FcharToInt(CPath.VolumeSeparatorChar))
      return s + CPath.DirectorySeparatorChar;
    if (length2 === 1 && CPath.DirectorySeparatorChar === '\\' && (FLength(path) >= 2 && FcharToInt(path[length1]) === FcharToInt(CPath.VolumeSeparatorChar)))
      return s + CPath.VolumeSeparatorChar;
    return CPath.CleanPath(s);
  }

  static GetExtension(path)
  {
    if (Fnull(path))
      return null;
    if (FIndexOfAny(path, CPath.InvalidPathChars) !== -1)
      throw new CArgumentException("Illegal characters in path.");
    var extension = CPath.findExtension(path);
    if (extension > -1 && extension < FLength(path) - 1)
      return FSubstring(path, extension);
    return Cstring.Empty;
  }

  static GetFileName(path)
  {
    if (Fnull(path) || FLength(path) === 0)
      return path;
    if (FIndexOfAny(path, CPath.InvalidPathChars) !== -1)
      throw new CArgumentException("Illegal characters in path.");
    var num = FLastIndexOfAny(path, CPath.PathSeparatorChars);
    if (num >= 0)
      return FSubstring(path, num + 1);
    return path;
  }

  static GetFileNameWithoutExtension(path)
  {
    return CPath.ChangeExtension(CPath.GetFileName(path), null);
  }

  static GetPathRoot(path)
  {
    if (Fnull(path))
      return null;
    if (FLength(FTrim(path)) === 0)
      throw new CArgumentException("The specified path is not of a legal form.");
    if (!CPath.IsPathRooted(path))
      return Cstring.Empty;
    if (CPath.DirectorySeparatorChar === '/')
    {
      if (!CPath.IsDirectorySeparator(path[0]))
        return Cstring.Empty;
      return CPath.DirectorySeparatorStr;
    }
    var length = 2;
    if (FLength(path) === 1 && CPath.IsDirectorySeparator(path[0]))
      return CPath.DirectorySeparatorStr;
    if (FLength(path) < 2)
      return Cstring.Empty;
    if (CPath.IsDirectorySeparator(path[0]) && CPath.IsDirectorySeparator(path[1]))
    {
      while (length < FLength(path) && !CPath.IsDirectorySeparator(path[length]))
        ++length;
      if (length < FLength(path))
      {
        ++length;
        while (length < FLength(path) && !CPath.IsDirectorySeparator(path[length]))
          ++length;
      }
      return CPath.DirectorySeparatorStr + CPath.DirectorySeparatorStr + FSubstring(path, 2, length - 2).Replace(CPath.AltDirectorySeparatorChar, CPath.DirectorySeparatorChar);
    }
    if (CPath.IsDirectorySeparator(path[0]))
      return CPath.DirectorySeparatorStr;
    if (FcharToInt(path[1]) !== FcharToInt(CPath.VolumeSeparatorChar))
      return FSubstring(CDirectory.GetCurrentDirectory(), 0, 2);
    if (FLength(path) >= 3 && CPath.IsDirectorySeparator(path[2]))
      ++length;
    return FSubstring(path, 0, length);
  }

  static IsPathRooted(path) {
    if (Fnull(path) || FLength(path) === 0)
      return false;
    if (FIndexOfAny(path, CPath.InvalidPathChars) !== -1)
      throw new CArgumentException("Illegal characters in path.");
    var ch = path[0];
    if (FcharToInt(ch) === FcharToInt(CPath.DirectorySeparatorChar) || FcharToInt(ch) === FcharToInt(CPath.AltDirectorySeparatorChar))
      return true;
    if (!CPath.dirEqualsVolume && FLength(path) > 1)
      return FcharToInt(path[1]) === FcharToInt(CPath.VolumeSeparatorChar);
    return false;
  }

  static GetInvalidPathChars() {
    if (!CEnvironment.IsRunningOnWindows)
      return ['\x00'];
    return [
        '"',
        '<',
        '>',
        '|',
        '\x00',
        '\x01',
        '\x02',
        '\x03',
        '\x04',
        '\x05',
        '\x06',
        '\a',
        '\b',
        '\t',
        '\n',
        '\v',
        '\f',
        '\r',
        '\x0E',
        '\x0F',
        '\x10',
        '\x11',
        '\x12',
        '\x13',
        '\x14',
        '\x15',
        '\x16',
        '\x17',
        '\x18',
        '\x19',
        '\x1A',
        '\x1B',
        '\x1C',
        '\x1D',
        '\x1E',
        '\x1F',
    ];
  }

  static findExtension(path)
  {
    if (!Fnull(path))
    {
      var num1 = FLastIndexOf(path, '.');
      var num2 = FLastIndexOfAny(path, CPath.PathSeparatorChars);
      if (num1 > num2)
        return num1;
    }
    return -1;
  }
};

MInput = class MInput {
  static async Update() {
  }
};

CEngine = class CEngine extends CGame {
  constructor(nativeWindow, display = "") {
    super(nativeWindow, display);

    CEngine.Instance = this;
  }

  static get Instance() {
    return CEngine.INTERNAL_Instance;
  }

  static set Instance(value) {
    if (CEngine.INTERNAL_Instance !== value)
    {
      CEngine.INTERNAL_Instance = value;
      CEngine.viewPadding = 0;
      CEngine.TimeRate = 1;
      CEngine.TimeRateB = 1;
      CEngine.FreezeTimer = 0.0;
      CEngine.ClearColor = CColor.Black;
      value.InactiveSleepTime = CTimeSpan.Zero;
      CEngine.Graphics = new CGraphicsDeviceManager(value);
    }
  }

  static get AssemblyDirectory()
  {
    return "//"; // TODO
  }

  get ContentDirectory()
  {
    return CPath.Combine(CEngine.AssemblyDirectory, CEngine.Instance.ContentRootDirectory);
  }

  get ContentRootDirectory()
  {
    return "//"; // TODO
  }

  /*protected*/ /*override*/ /*void*/ async Update(/*GameTime*/ gameTime)
  {
    CEngine.RawDeltaTime = /*(float)*/ gameTime.ElapsedGameTime.TotalSeconds;
    CEngine.DeltaTime = CEngine.RawDeltaTime * CEngine.TimeRate * CEngine.TimeRateB;
    await MInput.Update();
    if (CEngine.ExitOnEscapeKeypress && MInput.Keyboard.Pressed(Keys.Escape))
      this.Exit();
    else if (CEngine.OverloadGameLoop != null)
    {
      CEngine.OverloadGameLoop();
      await super.Update(gameTime);
    }
    else
    {
      if (/*(double)*/ CEngine.FreezeTimer > 0.0)
        CEngine.FreezeTimer = CMath.Max(CEngine.FreezeTimer - CEngine.RawDeltaTime, 0.0);
      else if (this.scene != null)
      {
        this.scene.BeforeUpdate();
        this.scene.Update();
        this.scene.AfterUpdate();
      }
      /* TODO
      if (CEngine.Commands.Open)
        CEngine.Commands.UpdateOpen();
      else if (CEngine.Commands.Enabled)
        CEngine.Commands.UpdateClosed();
        */
      if (this.scene !== this.nextScene)
      {
        /*Scene*/ let scene = this.scene;
        if (this.scene != null)
          this.scene.End();
        this.scene = this.nextScene;
        this.OnSceneTransition(scene, this.nextScene);
        if (this.scene != null)
          this.scene.Begin();
      }
      await super.Update(gameTime);
    }
  }

  /*protected*/ /*virtual*/ /*void*/ OnSceneTransition(/*Scene*/ from, /*Scene*/ to)
  {
    //GC.Collect();
    //GC.WaitForPendingFinalizers();
    CEngine.TimeRate = 1;
  }
};

CComponent = class CComponent {
  constructor(active, visible) {
    this.Active = active;
    this.Visible = visible;
    this.Entity = null;
  }

  Added(entity)
  {
    this.Entity = entity;
    if (this.Scene == null)
      return;
    this.Scene.Tracker.ComponentAdded(this);
  }

  Removed(entity)
  {
    if (this.Scene != null)
      this.Scene.Tracker.ComponentRemoved(this);
    this.Entity = null;
  }

  EntityAdded(scene)
  {
    scene.Tracker.ComponentAdded(this);
  }

  EntityRemoved(scene)
  {
    scene.Tracker.ComponentRemoved(this);
  }

  SceneEnd(scene)
  {
  }

  EntityAwake()
  {
  }

  Update()
  {
  }

  Render()
  {
  }

  DebugRender(camera)
  {
  }

  HandleGraphicsReset()
  {
  }

  HandleGraphicsCreate()
  {
  }

  RemoveSelf()
  {
    if (this.Entity == null)
      return;
    this.Entity.Remove(this);
  }

  /*
  public T SceneAs<T>() where T : Scene
  {
    return this.Scene as T;
  }

  public T EntityAs<T>() where T : Entity
  {
    return this.Entity as T;
  }
  */

  get Scene()
  {
    if (this.Entity == null)
      return null;
    return this.Entity.Scene;
  }
};

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
      this.ThrowForEmptyStack();
    return this._value[this.Count - 1];
  }

  Pop()
  {
    if (this.Count == 0)
      this.ThrowForEmptyStack();
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

CCoroutine = class CCoroutine extends CComponent {
  constructor(...args)
  {
    switch (args.length) {
      case 2: { super(true, false); this._preconstructor(); this._constructor2(...args); } break;
      case 1: { super(false, false); this._preconstructor(); this._constructor1(...args); } break;
      case 0: { super(false, false); this._preconstructor(); this._constructor1(...args); } break;
      default: throw new CArgumentException("Invalid argument count.");
    }
  }

  _preconstructor()
  {
    this.RemoveOnComplete = true;
    this.UseRawDeltaTime = false;
    this.enumerators = null; // : Stack<IEnumerator>
    this.waitTimer = 0.0;
    this.ended = false;
    this.Finished = false;
  }

  _constructor2(/*IEnumerator*/ functionCall, /*bool*/ removeOnComplete = true)
  {
    this.enumerators = new CStack/*<IEnumerator>*/();
    this.enumerators.Push(FasEnumerator(functionCall));
    this.RemoveOnComplete = removeOnComplete;
  }

  _constructor1(/*bool*/ removeOnComplete = true)
  {
    this.RemoveOnComplete = removeOnComplete;
    this.enumerators = new CStack/*<IEnumerator>*/();
  }

  Update()
  {
    this.ended = false;
    if (/*(double)*/ this.waitTimer > 0.0)
    {
      this.waitTimer -= this.UseRawDeltaTime ? CEngine.RawDeltaTime : CEngine.DeltaTime;
    }
    else
    {
      if (this.enumerators.Count <= 0)
        return;
      /*IEnumerator*/ enumerator = this.enumerators.Peek();
      if (enumerator.MoveNext() && !this.ended)
      {
        if (FisNumber(enumerator.Current))
        {
          this.waitTimer = enumerator.Current;
        }
        else
        {
          if (!(FisEnumerator(enumerator.Current)))
            return;
          this.enumerators.Push(FasEnumerator(enumerator.Current));
        }
      }
      else
      {
        if (this.ended)
          return;
        this.enumerators.Pop();
        if (this.enumerators.Count != 0)
          return;
        this.Finished = true;
        this.Active = false;
        if (!this.RemoveOnComplete)
          return;
        this.RemoveSelf();
      }
    }
  }

  Cancel()
  {
    this.Active = false;
    this.Finished = true;
    this.waitTimer = 0.0;
    this.enumerators.Clear();
    this.ended = true;
  }

  Replace(/*IEnumerator*/ functionCall)
  {
    this.Active = true;
    this.Finished = false;
    this.waitTimer = 0.0;
    this.enumerators.Clear();
    this.enumerators.Push(functionCall);
    this.ended = true;
  }
}; 

CGraphicsComponent = class GraphicsComponent extends CComponent {

  constructor(/*bool*/ active)
  {
    super(active, true);
    /*Vector2*/ this.Scale = CVector2.One;
    /*Color*/ this.Color = CColor.White;
    /*SpriteEffects*/ this.Effects = ESpriteEffects.None;
    /*Vector2*/ this.Position = CVector2.Zero;
    /*Vector2*/ this.Origin = CVector2.Zero;
    /*float*/ this.Rotation = 0;
  }

  /*float*/ get X() { return this.Position.X; }
  /*float*/ get Y() { return this.Position.Y; }

  set X(/*float*/ value) { this.Position.X = value; }
  set Y(/*float*/ value) { this.Position.Y = value; }


  /*bool*/ get FlipX() { return (this.Effects & ESpriteEffects.FlipHorizontally) === ESpriteEffects.FlipHorizontally; }
  /*bool*/ get FlipY() { return (this.Effects & ESpriteEffects.FlipVertically) === ESpriteEffects.FlipVertically; }

  set FlipX(/*bool*/ value) { this.Effects = value ? this.Effects | ESpriteEffects.FlipHorizontally : this.Effects & ~ESpriteEffects.FlipHorizontally; }
  set FlipY(/*bool*/ value) { this.Effects = value ? this.Effects | ESpriteEffects.FlipVertically : this.Effects & ~ESpriteEffects.FlipVertically; }

  /*float*/ get RenderPositionX() { return (this.Entity == null ? 0.0 : this.Entity.Position.X) + this.Position.X; }
  /*float*/ get RenderPositionY() { return (this.Entity == null ? 0.0 : this.Entity.Position.Y) + this.Position.Y; }
  set RenderPositionX(value) { this.Position.X = value - (this.Entity == null ? 0 : this.Entity.Position.X); }
  set RenderPositionY(value) { this.Position.Y = value - (this.Entity == null ? 0 : this.Entity.Position.Y); }

  get RenderPosition() { return new CVector2(this.RenderPositionX, this.RenderPositionY); }

  /*void*/ DrawOutline(/*int*/ offset = 1)
  {
    this.DrawOutline(CColor.Black, offset);
  }

  /*void*/ DrawOutline(/*Color*/ color, /*int*/ offset = 1)
  {
    /*Vector2*/ var position = this.Position.Clone();
    /*Color*/ var color1 = this.Color.Clone();
    this.Color.Assign(color);
    for (/*int*/ let index1 = -1; index1 < 2; ++index1)
    {
      for (/*int*/ let index2 = -1; index2 < 2; ++index2)
      {
        if (index1 !== 0 || /*(uint)*/ index2 > 0)
        {
          this.Position.X = position.X + (index1 * offset);
          this.Position.Y = position.Y + (index2 * offset);
          this.Render();
        }
      }
    }
    this.Position = position;
    this.Color.Assign(color1);
  }
}


CImage = class CImage extends CGraphicsComponent {
  constructor(/*MTexture*/ texture) {
    super(false);
    this.Texture = texture;
  }

  /*override*/ /*void*/ Render()
  {
    if (this.Texture == null)
      return;
    this.Texture.Draw(this.RenderPosition, this.Origin, this.Color, this.Scale, this.Rotation, this.Effects);
  }

  get Width() { return this.Texture.Width; }
  get Height() { return this.Texture.Height; }

  /*Image*/ SetOrigin(/*float*/ x, /*float*/ y) {
    this.Origin.X = x;
    this.Origin.Y = y;
    return this;
  }

  /*Image*/ CenterOrigin()
  {
    this.Origin.X = this.Width / 2;
    this.Origin.Y = this.Height / 2;
    return this;
  }

  /*Image*/ JustifyOriginAt(/*Vector2*/ at)
  {
    this.Origin.X = this.Width * at.X;
    this.Origin.Y = this.Height * at.Y;
    return this;
  }

  /*Image*/ JustifyOriginXY(/*float*/ x, /*float*/ y)
  {
    this.Origin.X = this.Width * x;
    this.Origin.Y = this.Height * y;
    return this;
  }
};

CVirtualAsset = /*abstract*/ class CVirtualAsset {
  //string Name { get; internal set; }

  //int Width { get; internal set; }

  //int Height { get; internal set; }

  constructor()
  {
    this.Name = "";
    this.Width = 0;
    this.Height = 0;
  }

  /*internal*/ /*virtual*/ /*void*/ Unload()
  {
  }

  /*internal*/ /*virtual*/ /*void*/ Reload()
  {
  }

  /*virtual*/ /*void*/ Dispose()
  {
  }
}

CDraw = class CDraw {

  /*internal*/ static /*void*/ Initialize(/*GraphicsDevice*/ graphicsDevice)
  {
    CDraw.SpriteBatch = new CSpriteBatch(graphicsDevice);
    //CDraw.DefaultFont = CEngine.Instance.Content.Load<SpriteFont>("Monocle\\MonocleDefault"); // TODO
    CDraw.UseDebugPixelTexture();
  }

  /*public*/ static /*void*/ UseDebugPixelTexture()
  {
    // TODO
    // /*MTexture*/ let parent = new MTexture(CVirtualContent.CreateTexture("debug-pixel", 3, 3, Color.White));
    // Draw.Pixel = new MTexture(parent, 1, 1, 1, 1);
    // Draw.Particle = new MTexture(parent, 1, 1, 1, 1);
  }
};

