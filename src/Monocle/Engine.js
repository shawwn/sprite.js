
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
  static Initialize() {
  }

  static async Update() {
  }
};

CTracker = class CTracker {
  static Initialize() {
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

function _gl(graphicsDevice) {
  return graphicsDevice.GLDevice.gl;
}


CGraphicsResource = class CGraphicsResource {
};

CTexture = class CTexture extends CGraphicsResource {
};

CTexture2D = class CTexture2D extends CTexture {
  constructor(graphicsDevice, width, height) {
    super();
    this.GraphicsDevice = graphicsDevice;
    this.Width = width;
    this.Height = height;
    this.Handle = null;
  }

  get gl() { return _gl(this.GraphicsDevice); }

  Unload()
  {
    if (this.Handle != null)
    {
      this.gl.deleteTexture(this.Handle);
    }
    this.Handle = null;
  }

  SetData(data, opts = {min: this.gl.LINEAR, mag: this.gl.NEAREST})
  {
    this.Unload();
    this.Handle = twgl.createTexture(this.gl,
      Object.assign({ src: data }, opts),
      (err, tex, img) => {
      if (err == null) {
        this.Width = img.width;
        this.Height = img.height;
      } else {
        debugger;
      }
    });
  }
};

CVirtualTexture = class CVirtualTexture extends CVirtualAsset {
  constructor(...args)
  {
    switch (args.length) {
      case 1: { super(); this.CVirtualTexture1(...args); } break;
      case 4: { super(); this.CVirtualTexture4(...args); } break;
      default: throw new CArgumentException("Invalid argument count.");
    }
  }
  CVirtualTexture1(/*string*/ path)
  {
    this.Name = this.Path = path;
    this.Width = 0;
    this.Height = 0;
    this.Reload();
  }
  CVirtualTexture4(/*string*/ name, /*int*/ width, /*int*/ height, /*Color*/ color)
  {
    this.Name = name;
    this.Width = width;
    this.Height = height;
    this.Color = color;
    this.Reload();
  }

  /*internal*/ /*override*/ /*void*/ Unload()
  {
    if (this.Texture != null && !this.Texture.IsDisposed)
      this.Texture.Dispose();
    this.Texture = /*(Texture2D)*/ null;
  }

  /*internal*/ /*override*/ /*unsafe*/ /*void*/ Reload()
  {
    this.Unload();
    if (Cstring.IsNullOrEmpty(this.Path))
    {
      this.Texture = new CTexture2D(CEngine.Instance.GraphicsDevice, this.Width, this.Height);
      /* TODO
      Color[] data = new Color[this.Width * this.Height];
      fixed (Color* colorPtr = data)
      {
        for (int index = 0; index < data.Length; ++index)
          colorPtr[index] = this.color;
      }
      this.Texture.SetData<Color>(data);
      */
      let data = createAugmentedTypedArray(4, this.Width * this.Height, Uint8Array);
      for (let index = 0; index < data.length; index += 4)
      {
        data[index + 0] = this.Color.R * 255
        data[index + 1] = this.Color.G * 255
        data[index + 2] = this.Color.B * 255
        data[index + 3] = this.Color.A * 255
      }
      this.Texture.SetData(data);
    }
    else
    {
      this.Texture = new CTexture2D(CEngine.Instance.GraphicsDevice, this.Width, this.Height);
      this.Texture.SetData(this.Path);
    }
  }
};

CVirtualContent = class CVirtualContent {

  //private static List<VirtualAsset> assets = new List<VirtualAsset>();
  static get assets()
  {
    if (CVirtualContent.INTERNAL_assets == null)
      CVirtualContent.INTERNAL_assets = new CList();
    return CVirtualContent.INTERNAL_assets;
  }

  //private static bool reloading;

  /*public*/ static /*int*/ get Count()
  {
    return CVirtualContent.assets.Count;
  }

  static CreateTexture(...args)
  {
    switch(args.length) {
      case 1: return CVirtualContent.CreateTexture1(...args); break;
      case 4: return CVirtualContent.CreateTexture4(...args); break;
      default: throw new CArgumentException("Invalid argument count");
    }
  }

  /*public*/ static /*VirtualTexture*/ CreateTexture1(/*string*/ path)
  {
    /*VirtualTexture*/ let virtualTexture = new CVirtualTexture(path);
    CVirtualContent.assets.Add(/*(VirtualAsset)*/ virtualTexture);
    return virtualTexture;
  }

  /*public*/ static /*VirtualTexture*/ CreateTexture4(
    /*string*/ name,
    /*int*/ width,
    /*int*/ height,
    /*Color*/ color)
  {
    /*VirtualTexture*/ let virtualTexture = new CVirtualTexture(name, width, height, color);
    CVirtualContent.assets.Add(/*(VirtualAsset)*/ virtualTexture);
    return virtualTexture;
  }

  static Reload() {
  }
};

CPooler = class CPooler {
};

CCommands = class CCommands {
};

CEngine = class CEngine extends CGame {
  constructor(nativeWindow, display = "") {
    super(nativeWindow, display);

    CEngine.Instance = this;
    CEngine.Graphics = new CGraphicsDeviceManager(this);
    CEngine.Graphics.DeviceReset["+="](this.OnGraphicsReset, this);
    CEngine.Graphics.DeviceCreated["+="](this.OnGraphicsCreate, this);
    CEngine.Graphics.ApplyChanges();

    let bounds = this.Window.ClientBounds;
    CEngine.Width = bounds.Width;
    CEngine.Height = bounds.Height;
  }

  get GraphicsDevice() {
    return CEngine.Graphics.GraphicsDevice;
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
      CEngine.PrevTime = CEngine.Time = CTimeSpan.Zero;
      value.InactiveSleepTime = CTimeSpan.Zero;
    }
  }

  //static get Width() { return CEngine.Instsance.Window.ClientBounds.Width; }
  //static get Height() { return CEngine.Instsance.Window.ClientBounds.Height; }

  static get ViewPadding() { return CEngine.viewPadding; }
  static set ViewPadding(value) 
  {
    CEngine.viewPadding = value;
    CEngine.Instance.UpdateView();
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

  /*protected*/ /*override*/ /*void*/ Initialize()
  {
    super.Initialize();
    MInput.Initialize();
    CTracker.Initialize();
    CEngine.Pooler = new CPooler();
    CEngine.Commands = new CCommands();
  }

  /*protected*/ /*override*/ /*void*/ LoadContent()
  {
    super.LoadContent();
    CVirtualContent.Reload();
    CDraw.Initialize(this.GraphicsDevice);
  }

  /*protected*/ /*override*/ /*void*/ UnloadContent()
  {
    super.UnloadContent();
    CVirtualContent.Unload();
  }

  /*protected*/ /*override*/ /*void*/ async BeginDraw()
  {
    if (this.Window.ClientBounds.Width !== CEngine.Width || 
      this.Window.ClientBounds.Height !== CEngine.Height)
    {
      CEngine.Graphics.ApplyChanges();
    }
    let bounds = this.Window.ClientBounds;
    CEngine.Width = bounds.Width;
    CEngine.Height = bounds.Height;
    return await super.BeginDraw();
  }

  /*protected*/ /*override*/ /*void*/ async Update(/*GameTime*/ gameTime)
  {
    CEngine.RawDeltaTime = /*(float)*/ gameTime.ElapsedGameTime.TotalSeconds;
    CEngine.DeltaTime = CEngine.RawDeltaTime * CEngine.TimeRate * CEngine.TimeRateB;
    CEngine.PrevTime = (CEngine.Time || gameTime.TotalGameTime).Clone();
    CEngine.Time = gameTime.TotalGameTime.Clone();
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

  /*protected*/ /*virtual*/ /*void*/ OnGraphicsReset(/*object*/ sender, /*EventArgs*/ e)
  {
    this.UpdateView();
    if (this.scene != null)
      this.scene.HandleGraphicsReset();
    if (this.nextScene == null || this.nextScene === this.scene)
      return;
    this.nextScene.HandleGraphicsReset();
  }

  /*protected*/ /*virtual*/ /*void*/ OnGraphicsCreate(/*object*/ sender, /*EventArgs*/ e)
  {
    this.UpdateView();
    if (this.scene != null)
      this.scene.HandleGraphicsCreate();
    if (this.nextScene == null || this.nextScene === this.scene)
      return;
    this.nextScene.HandleGraphicsCreate();
  }


  /*private*/ /*void*/ UpdateView()
  {
    /*float*/ let backBufferWidth = /*(float)*/ this.GraphicsDevice.PresentationParameters.BackBufferWidth;
    /*float*/ let backBufferHeight = /*(float)*/ this.GraphicsDevice.PresentationParameters.BackBufferHeight;
    if (/*(double)*/ backBufferWidth / /*(double)*/ CEngine.Width > /*(double)*/ backBufferHeight / /*(double)*/ CEngine.Height)
    {
      CEngine.ViewWidth = _int(/*(double)*/ backBufferHeight / /*(double)*/ CEngine.Height * /*(double)*/ CEngine.Width);
      CEngine.ViewHeight = _int(backBufferHeight);
    }
    else
    {
      CEngine.ViewWidth = _int(backBufferWidth);
      CEngine.ViewHeight = _int(/*(double)*/ backBufferWidth / /*(double)*/ CEngine.Width * /*(double)*/ CEngine.Height);
    }
    /*float*/ let num = /*(float)*/ CEngine.ViewHeight / /*(float)*/ CEngine.ViewWidth;
    CEngine.ViewWidth -= CEngine.ViewPadding * 2;
    CEngine.ViewHeight -= _int(/*(double)*/ num * /*(double)*/ CEngine.ViewPadding * 2.0);
    CEngine.ScreenMatrix = CMatrix.CreateScale(/*(float)*/ CEngine.ViewWidth / /*(float)*/ CEngine.Width);
    CEngine.Viewport = new CViewport(
      _int(/*(double)*/ backBufferWidth / 2.0 - /*(double)*/ (CEngine.ViewWidth / 2)),
      _int(/*(double)*/ backBufferHeight / 2.0 - /*(double)*/ (CEngine.ViewHeight / 2)),
      CEngine.ViewWidth,
      CEngine.ViewHeight,
      0.0,
      1.0);
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
      this.ThrowForEmptyList();
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
    CCalc.Shuffle(this, random);
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

CMTexture = class CMTexture {
  constructor(...args)
  {
    switch (args.length) {
      case 1: { this.CMTexture1(...args); } break;
      case 5: { this.CMTexture5(...args); } break;
      case 2: { this.CMTexture2(...args); } break;
      default: throw new CArgumentException("Invalid argument count.");
    }
  }

  CMTexture1(/*VirtualTexture*/ texture)
  {
    this.Texture = texture;
    this.AtlasPath = /*(string)*/null;
    this.ClipRect = new CRectangle(0, 0, this.Texture.Width, this.Texture.Height);
    this.DrawOffset = CVector2.Zero;
    this.Width = this.ClipRect.Width;
    this.Height = this.ClipRect.Height;
    this.SetUtil();
  }

  CMTexture5(/*VirtualTexture*/ parent, /*int*/ x, /*int*/ y, /*int*/ width, /*int*/ height)
  {
    this.Texture = parent.Texture;
    this.AtlasPath = /*(string)*/null;
    this.ClipRect = parent.GetRelativeRect(x, y, width, height);
    this.DrawOffset = new CVector2(-CMath.Min(/*(float)*/x - parent.DrawOffset.X, 0.0), -CMath.Min(/*(float)*/y - parent.DrawOffset.Y, 0.0));
    this.Width = width;
    this.Height = height;
    this.SetUtil();
  }

  CMTexture2(/*VirtualTexture*/ parent, /*Rectangle*/ clipRect)
  {
    this.CMTexture5(parent, clipRect.X, clipRect.Y, clipRect.Width, clipRect.Height);
  }

  SetUtil()
  {
    this.Center = new CVector2(0.5 * /*(float)*/ this.Width, 0.5 * /*(float)*/ this.Height);
    this.LeftUV = /*(float)*/ this.ClipRect.Left / /*(float)*/ this.Texture.Width;
    this.RightUV = /*(float)*/ this.ClipRect.Right / /*(float)*/ this.Texture.Width;
    this.TopUV = /*(float)*/ this.ClipRect.Top / /*(float)*/ this.Texture.Height;
    this.BottomUV = /*(float)*/ this.ClipRect.Bottom / /*(float)*/ this.Texture.Height;
  }

  GetRelativeRect(...args)
  {
    switch (args.length) {
      case 1: { return this.GetRelativeRect1(...args); } break;
      case 4: { return this.GetRelativeRect4(...args); } break;
      default: throw new CArgumentException("Invalid argument count.");
    }
  }

  /*public*/ /*Rectangle*/ GetRelativeRect1(/*Rectangle*/ rect)
  {
    return this.GetRelativeRect4(rect.X, rect.Y, rect.Width, rect.height);
  }

  /*public*/ /*Rectangle*/ GetRelativeRect4(/*int*/ x, /*int*/ y, /*int*/ width, /*int*/ height)
  {
    /*int*/ let num1 = _int(/*(double)*/ this.ClipRect.X - /*(double)*/ this.DrawOffset.X + /*(double)*/ x);
    /*int*/ let num2 = _int(/*(double)*/ this.ClipRect.Y - /*(double)*/ this.DrawOffset.Y + /*(double)*/ y);
    /*double*/ let num3 = /*(double)*/ num1;
    /*Rectangle*/ let clipRect1 = this.ClipRect.Clone();
    /*double*/ let left = /*(double)*/ clipRect1.Left;
    clipRect1 = this.ClipRect;
    /*double*/ let right = /*(double)*/ clipRect1.Right;
    /*int*/ let x1 = _int(CMathHelper.Clamp(/*(float)*/ num3, /*(float)*/ left, /*(float)*/ right));
    /*double*/ let num4 = /*(double)*/ num2;
    /*Rectangle*/ let clipRect2 = this.ClipRect.Clone();
    /*double*/ let top = /*(double)*/ clipRect2.Top;
    clipRect2 = this.ClipRect;
    /*double*/ let bottom = /*(double)*/ clipRect2.Bottom;
    /*int*/ let y1 = _int(CMathHelper.Clamp(/*(float)*/ num4, /*(float)*/ top, /*(float)*/ bottom));
    /*int*/ let width1 = CMath.Max(0, CMath.Min(num1 + width, this.ClipRect.Right) - x1);
    /*int*/ let height1 = CMath.Max(0, CMath.Min(num2 + height, this.ClipRect.Bottom) - y1);
    return new CRectangle(x1, y1, width1, height1);
  }
};

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

  JustifyOrigin(...args)
  {
    switch (args.length) {
      case 1: { return this.JustifyOrigin1(...args); } break;
      case 2: { return this.JustifyOrigin2(...args); } break;
      default: throw new CArgumentException("Invalid argument count.");
    }
  }

  /*Image*/ JustifyOrigin1(/*Vector2*/ at)
  {
    this.Origin.X = this.Width * at.X;
    this.Origin.Y = this.Height * at.Y;
    return this;
  }

  /*Image*/ JustifyOrigin2(/*float*/ x, /*float*/ y)
  {
    this.Origin.X = this.Width * x;
    this.Origin.Y = this.Height * y;
    return this;
  }
};

CDraw = class CDraw {

  /*internal*/ static /*void*/ Initialize(/*GraphicsDevice*/ graphicsDevice)
  {
    CDraw.SpriteBatch = new CSpriteBatch(graphicsDevice);
    //CDraw.DefaultFont = CEngine.Instance.Content.Load<SpriteFont>("Monocle\\MonocleDefault"); // TODO
    CDraw.UseDebugPixelTexture();
  }

  /*public*/ static /*void*/ UseDebugPixelTexture()
  {
    /*MTexture*/ let parent = new CMTexture(CVirtualContent.CreateTexture("debug-pixel", 3, 3, CColor.FromRGB(1.0, 0.0, 1.0)));
    CDraw.Pixel = new CMTexture(parent, 1, 1, 1, 1);
    CDraw.Particle = new CMTexture(parent, 1, 1, 1, 1);
    CDraw.Font = new CMTexture(CVirtualContent.CreateTexture("../tests/celeste/Monocle/MonocleDefault.png"));
    CDraw.Font.Width = 128;
    CDraw.Font.Height = 128;
    CDraw.Font.Texture.Width = 128;
    CDraw.Font.Texture.Height = 128;
    CDraw.Font.ClipRect.Assign(new CRectangle(0,0,128,128));
    CDraw.Font.SetUtil();
  }
};

CCamera = class CCamera {
  constructor(...args)
  {
    switch (args.length) {
      case 0: { this.CCamera0(...args); } break;
      case 2: { this.CCamera2(...args); } break;
      default: throw new CArgumentException("Invalid argument count.");
    }
  }

  CCamera0()
  {
    this.CCamera2(CEngine.Width, CEngine.Height);
  }

  CCamera2(/*int*/ width, /*int*/ height)
  {
    this.matrix = CMatrix.Identity;
    this.inverse = CMatrix.Identity;
    this.position = CVector2.Zero;
    this.zoom = CVector2.One;
    this.origin = CVector2.Zero;
    this.angle = 0.0;
    this.changed = false;
    this.Round = true;

    this.Viewport = new CViewport();
    this.Viewport.Width = width;
    this.Viewport.Height = height;
    this.UpdateMatrices();
  }

  _Round(value)
  {
    return this.Round ? CMath.Floor(value) : value;
  }

  UpdateMatrices()
  {
    /*
    this.matrix = Matrix.Identity * 
      Matrix.CreateTranslation(new Vector3(-new Vector2((float) (int) Math.Floor((double) this.position.X), (float) (int) Math.Floor((double) this.position.Y)), 0.0f)) *
      Matrix.CreateRotationZ(this.angle) * 
      Matrix.CreateScale(new Vector3(this.zoom, 1f)) * 
      Matrix.CreateTranslation(new Vector3(new Vector2((float) (int) Math.Floor((double) this.origin.X), (float) (int) Math.Floor((double) this.origin.Y)), 0.0f));
      */
    this.matrix.Reset();
    this.matrix["*="](CMatrix.CreateTranslation(
      - /*(float)*/ /*(int)*/ this._Round(/*(double)*/ this.position.X),
      - /*(float)*/ /*(int)*/ this._Round(/*(double)*/ this.position.Y),
      0.0));
    this.matrix["*="](CMatrix.CreateRotationZ(this.angle));
    this.matrix["*="](CMatrix.CreateScale(this.zoom.X, this.zoom.Y, 1.0));
    this.matrix["*="](CMatrix.CreateTranslation(
      /*(float)*/ /*(int)*/ this._Round(/*(double)*/ this.origin.X),
      /*(float)*/ /*(int)*/ this._Round(/*(double)*/ this.origin.Y),
      0.0));

    this.inverse = this.matrix.Inverse(this.inverse);
    this.changed = false;
  }

  CopyFrom(/*Camera*/ other)
  {
    this.position.Assign(other.position);
    this.origin.Assign(other.origin);
    this.angle = other.angle;
    this.zoom.Assign(other.zoom);
    this.changed = true;
  }

  get Matrix()
  {
    if (this.changed)
      this.UpdateMatrices();
    return this.matrix;
  }

  get Inverse()
  {
    if (this.changed)
      this.UpdateMatrices();
    return this.inverse;
  }

  get Position()
  {
    return this.position;
  }

  set Position(value)
  {
    this.changed = true;
    this.position.Assign(value);
  }

  get Origin()
  {
    return this.origin;
  }

  set Origin(value)
  {
    this.changed = true;
    this.origin.Assign(value);
  }

  get X()
  {
    return this.position.X;
  }

  set X(value)
  {
    this.changed = true;
    this.position.X = value;
  }

  get Y()
  {
    return this.position.Y;
  }

  set Y(value)
  {
    this.changed = true;
    this.position.Y = value;
  }

  get Zoom()
  {
    return this.zoom.X;
  }

  set Zoom(value)
  {
    this.changed = true;
    this.zoom.X = this.zoom.Y = value;
  }

  get Angle()
  {
    return this.angle;
  }

  set Angle(value)
  {
    this.changed = true;
    this.angle = value;
  }

  get Left()
  {
    if (this.changed)
      this.UpdateMatrices();
    return CVector2.Transform(CVector2.Zero, this.Inverse).X;
  }

  set Left(value)
  {
    if (this.changed)
      this.UpdateMatrices();
    this.X = CVector2.Transform(CVector2.UnitX["*"](value), this.Matrix).X;
  }

  get Right()
  {
    if (this.changed)
      this.UpdateMatrices();
    return CVector2.Transform(CVector2.UnitX["*"](this.Viewport.Width), this.Inverse).X;
  }

  set Right(value)
  {
    throw new CNotImplementedException();
  }

  get Top()
  {
    if (this.changed)
      this.UpdateMatrices();
    return CVector2.Transform(CVector2.Zero, this.Inverse).Y;
  }

  set Top(value)
  {
    if (this.changed)
      this.UpdateMatrices();
    this.Y = CVector2.Transform(CVector2.UnitY["*"](value), this.Matrix).Y;
  }

  get Bottom()
  {
    if (this.changed)
      this.UpdateMatrices();
    return CVector2.Transform(CVector2.UnitY["*"](this.Viewport.Height), this.Inverse).Y;
  }

  set Bottom(value)
  {
    throw new CNotImplementedException();
  }

  /*public*/ /*void*/ CenterOrigin()
  {
    this.origin = new CVector2(/*(float)*/ this.Viewport.Width / 2, /*(float)*/ this.Viewport.Height / 2);
    this.changed = true;
  }

  /*public*/ /*void*/ RoundPosition()
  {
    this.position.X = /*(float)*/ CMath.Round(/*(double)*/ this.position.X);
    this.position.Y = /*(float)*/ CMath.Round(/*(double)*/ this.position.Y);
    this.changed = true;
  }

  /*public*/ /*Vector2*/ ScreenToCamera(/*Vector2*/ position)
  {
    return CVector2.Transform(position, this.Inverse);
  }

  /*public*/ /*Vector2*/ CameraToScreen(/*Vector2*/ position)
  {
    return CVector2.Transform(position, this.Matrix);
  }

  /*public*/ /*void*/ Approach(...args)
  {
    switch(args.length) {
      case 2: return this.Approach2(...args); break;
      case 3: return this.Approach3(...args); break;
      default: throw new CArgumentException("Invalid argument count");
    }
  }

  /*public*/ /*void*/ Approach2(/*Vector2*/ position, /*float*/ ease)
  {
    this.Position["+="](position["-"](this.Position)["*"](ease));
    this.changed = true;
  }

  /*public*/ /*void*/ Approach3(/*Vector2*/ position, /*float*/ ease, /*float*/ maxDistance)
  {
    /*Vector2*/ let vector2 = position["-"](this.Position)["*"](ease);
    if (/*(double)*/ vector2.Length() > /*(double)*/ maxDistance)
      this.Position["+="](CVector2.Normalize(vector2)["*"](maxDistance));
    else
      this.Position["+="](vector2);
    this.changed = true;
  }
};

CEntityList = class CEntityList
{
  static CompareDepth(a, b)
  {
    return CMath.Sign(b.actualDepth - a.actualDepth);
  }

  constructor(/*Scene*/ scene)
  {
    this.Scene = scene;
    this.entities = new CList();
    this.toAdd = new CList();
    this.toAwake = new CList();
    this.toRemove = new CList();
    this.current = new CList();
    this.adding = new CList();
    this.removing = new CList();
    this.unsorted = false;
  }

  MarkUnsorted()
  {
    this.unsorted = true;
  }

  UpdateLists()
  {
    if (this.toAdd.Count > 0)
    {
      for (let index = 0; index < this.toAdd.Count; ++index)
      {
        let entity = this.toAdd.At(index);
        if (!this.current.Contains(entity))
        {
          this.current.Add(entity);
          this.entities.Add(entity);
          if (this.Scene != null)
          {
            this.Scene.TagLists.EntityAdded(entity);
            this.Scene.Tracker.EntityAdded(entity);
            entity.Added(this.Scene);
          }
        }
      }
      this.unsorted = true;
    }
    if (this.toRemove.Count > 0)
    {
      for (let index = 0; index < this.toRemove.Count; ++index)
      {
        let entity = this.toRemove.At(index);
        if (this.current.Contains(entity))
        {
          this.current.Remove(entity);
          this.entities.Remove(entity);
          if (this.Scene != null)
          {
            entity.Removed(this.Scene);
            this.Scene.TagLists.EntityRemoved(entity);
            this.Scene.Tracker.EntityRemoved(entity);
            CEngine.Pooler.EntityRemoved(entity);
          }
        }
      }
      this.toRemove.Clear();
      this.removing.Clear();
    }
    if (this.unsorted)
    {
      this.unsorted = false;
      this.entities.Sort(CEntityList.CompareDepth);
    }
    if (this.toAdd.Count <= 0)
      return;
    this.toAwake.AddRange(this.toAdd);
    this.toAdd.Clear();
    this.adding.Clear();
    for (let entity of this.toAwake)
    {
      if (entity.Scene === this.Scene)
        entity.Awake(this.Scene);
    }
    this.toAwake.Clear();
  }

  [Symbol.iterator]()
  {
    return this.entities.Iterator;
  }

  Add(/*Entity*/ entity)
  {
    if (this.adding.Contains(entity) || this.current.Contains(entity))
      return;
    this.adding.Add(entity);
    this.toAdd.Add(entity);
  }

  Remove(/*Entity*/ entity)
  {
    if (this.removing.Contains(entity) || !this.current.Contains(entity))
      return;
    this.removing.Add(entity);
    this.toRemove.Add(entity);
  }

  get Count()
  {
    return this.entities.Count;
  }

  At(/*int*/ index)
  {
    if (index < 0 || index >= this.entities.Count)
      throw new CIndexOutOfRangeException();
    return this.entities.At(index);
  }

  /*int*/ AmountOf(T)
  {
    /*int*/ let num = 0;
    for (let entity of this.entities)
    {
      if (entity instanceof T)
        ++num;
    }
    return num;
  }

  /*Entity*/ FindFirst(T)
  {
    for (let entity of this.entities)
    {
      if (entity instanceof T)
        return entity;
    }
  }

  /*List<T>*/ FindAll(T)
  {
    let objList = new CList();
    for (let entity of this.entities)
    {
      if (entity instanceof T)
        objList.Add(entity);
    }
    return objList;
  }

  /*void*/ With(T, /*Action<T>*/ action)
  {
    for (let entity of this.entities)
    {
      if (entity instanceof T)
        action(entity);
    }
  }

  ToArray()
  {
    return [...this];
  }

  Update()
  {
    for (let entity of this.entities)
    {
      if (entity.Active)
        entity.Update();
    }
  }

  Render()
  {
    for (let entity of this.entities)
    {
      if (entity.Visible)
        entity.Render();
    }
  }

  DebugRender(/*Camera*/ camera)
  {
    for (let entity of this.entities)
      entity.DebugRender(camera);
  }

  HandleGraphicsReset()
  {
    for (let entity of this.entities)
      entity.HandleGraphicsReset();
  }

  HandleGraphicsCreate()
  {
    for (let entity of this.entities)
      entity.HandleGraphicsCreate();
  }
};

CComponentList = class CComponentList
{
  constructor()
  {
    this.components = new CList();
  }

  [Symbol.iterator]()
  {
    return this.components.Iterator;
  }

  /*public*/ /*virtual*/ /*void*/ Update()
  {
    // TODO
  }

  /*public*/ /*virtual*/ /*void*/ Render()
  {
    // TODO
  }

  /*public*/ /*virtual*/ /*void*/ DebugRender(/*Camera*/ camera)
  {
    // TODO
  }

  /*public*/ /*virtual*/ /*void*/ HandleGraphicsReset()
  {
    // TODO
  }

  /*public*/ /*virtual*/ /*void*/ HandleGraphicsCreate()
  {
    // TODO
  }
}

CTracker = class CTracker
{
  static Initialize()
  {
  }
}

CTagLists = class CTagLists
{
}

CRendererList = class CRendererList
{
}

CScene = class CScene
{
  constructor()
  {
    this.Paused = false;
    this.TimeActive = 0.0;
    this.RawTimeActive = 0.0;
    this.actualDepthLookup = Object.create(null);//TODO;

    this.Tracker = new CTracker();
    this.Entities = new CEntityList(this);
  }
};

CEntity = class CEntity
{
  constructor(position = CVector2.Zero)
  {
    this.Active = true;
    this.Visible = true;
    this.Collidable = true;
    this.depth = 0;
    this.actualDepth = 0.0;
    this.Position = position;
    this.tag = 0;
    this.Components = new CComponentList(this);
  }

  /*public*/ /*virtual*/ /*void*/ SceneBegin(/*Scene*/ scene)
  {
  }

  /*public*/ /*virtual*/ /*void*/ SceneEnd(/*Scene*/ scene)
  {
    if (this.Components == null)
      return;
    for (/*Component*/ let component of this.Components)
      component.SceneEnd(scene);
  }

  /*public*/ /*virtual*/ /*void*/ Awake(/*Scene*/ scene)
  {
    if (this.Components == null)
      return;
    for (/*Component*/ let component of this.Components)
      component.EntityAwake();
  }

  /*public*/ /*virtual*/ /*void*/ Added(/*Scene*/ scene)
  {
    this.Scene = scene;
    if (this.Components != null)
    {
      for (/*Component*/ let component of this.Components)
        component.EntityAdded(scene);
    }
    this.Scene.SetActualDepth(this);
  }

  /*public*/ /*virtual*/ /*void*/ Removed(/*Scene*/ scene)
  {
    if (this.Components != null)
    {
      for (/*Component*/ let component of this.Components)
        component.EntityRemoved(scene);
    }
    this.Scene = /*(Scene)*/ null;
  }

  /*public*/ /*virtual*/ /*void*/ Update()
  {
    this.Components.Update();
  }

  /*public*/ /*virtual*/ /*void*/ Render()
  {
    this.Components.Render();
  }

  /*public*/ /*virtual*/ /*void*/ DebugRender(/*Camera*/ camera)
  {
    if (this.Collider != null)
      this.Collider.Render(camera, this.Collidable ? CColor.Red : CColor.DarkRed);
    this.Components.DebugRender(camera);
  }

  /*public*/ /*virtual*/ /*void*/ HandleGraphicsReset()
  {
    this.Components.HandleGraphicsReset();
  }

  /*public*/ /*virtual*/ /*void*/ HandleGraphicsCreate()
  {
    this.Components.HandleGraphicsCreate();
  }

  /*public*/ /*void*/ RemoveSelf()
  {
    if (this.Scene == null)
      return;
    this.Scene.Entities.Remove(this);
  }
};

CActor = class CActor extends CEntity
{
  constructor(/*Vector2*/ position = CVector2.Zero)
  {
    super(position);
  }
};

CBirdNPC = class CBirdNPC extends CActor
{
  constructor(/*Vector2*/ position, /*BirdNPC.Modes*/ mode)
  {
    super(position);
    this.mode = mode;
  }

  /*public*/ /*enum*/ static get Modes()
  {
    return CBirdNPC.INTERNAL_Modes || (CBirdNPC.INTERNAL_Modes = {
      ClimbingTutorial: "CBirdNPC.Modes.ClimbingTutorial",
      DashingTutorial: "CBirdNPC.Modes.DashingTutorial",
      DreamJumpTutorial: "CBirdNPC.Modes.DreamJumpTutorial",
      SuperWallJumpTutorial: "CBirdNPC.Modes.SuperWallJumpTutorial",
      HyperJumpTutorial: "CBirdNPC.Modes.HyperJumpTutorial",
      FlyAway: "CBirdNPC.Modes.FlyAway",
      None: "CBirdNPC.Modes.None",
      Sleeping: "CBirdNPC.Modes.Sleeping",
    });
  }
};

CCalc = class CCalc {

  static get Random()
  {
    if (CCalc.INTERNAL_Random == null)
      CCalc.INTERNAL_Random = new CRandom();
    return CCalc.INTERNAL_Random;
  }

  static set Random(value)
  {
    CCalc.INTERNAL_Random = value;
    return value;
  }

  static get RandomStack()
  {
    if (CCalc.INTERNAL_RandomStack == null)
      CCalc.INTERNAL_RandomStack = new CStack();
    return CCalc.INTERNAL_RandomStack;
  }

  static PushRandom(newSeed)
  {
    if (newSeed == null)
      newSeed = new CRandom();
    CCalc.RandomStack.Push(CCalc.Random);
    CCalc.Random = (newSeed instanceof CRandom) ? newSeed : new CRandom(newSeed);
  }

  static PopRandom()
  {
    CCalc.Random = CCalc.RandomStack.Pop();
  }

  static RandomUint32() {
    let array = CCalc.INTERNAL_RandomUint32 || (CCalc.INTERNAL_RandomUint32 = new Uint32Array(1));
    crypto.getRandomValues(array);
    return array[0];
  }

  static At(list, index) {
    return list.At ? list.At(index) : list[index];
  }
  
  static Set(list, index, value) {
    return list.Set ? list.Set(index, value) : (list[index] = value);
  }

  static Length(list) {
    let n = list.Count;
    return (n == null) ? FLength(list) : n;
  }


  /*public*/ static /*bool*/ BetweenInterval(/*float*/ val, /*float*/ interval)
  {
    return /*(double)*/ val % (/*(double)*/ interval * 2.0) > /*(double)*/ interval;
  }

  /*public*/ static /*bool*/ OnInterval(/*float*/ val, /*float*/ prevVal, /*float*/ interval)
  {
    return _int(/*(double)*/ prevVal / /*(double)*/ interval) !== _int(/*(double)*/ val / /*(double)*/ interval);
  }


  static GiveMe(index, ...args)
  {
    if (index < 0 || index >= CCalc.Length(args))
      throw new CIndexOutOfRangeException();
    return CCalc.At(args, index);
  }

  static Choose(/*Random*/ random, ...args)
  {
    random = random || CCalc.Random;
    return CCalc.GiveMe(random.Next(CCalc.Length(args)), ...args);
  }

  /*public*/ static /*void*/ Shuffle/*<T>*/(/*this List<T>*/ list, /*Random*/ random)
  {
    random = random || CCalc.Random;
    /*int*/ let count = CCalc.Length(list);
    while (--count > 0)
    {
      /*T*/ let obj = CCalc.At(list, count);
      /*int*/ let index;
      CCalc.Set(list, count, CCalc.At(list, index = random.Next(count + 1)));
      CCalc.Set(list, index, obj);
    }
    return list;
  }


  /*public*/ static /*T*/ Approach(/*T*/ val, /*T*/ target, /*float*/ maxMove)
  {
    if (typeof val === "number") return CCalc.Approach_float(val, target, maxMove);
    if (val instanceof CVector2) return CCalc.Approach_Vector2(val, target, maxMove);
    throw new CArgumentException("Invalid argument type.");
  }

  /*public*/ static /*float*/ Approach_float(/*float*/ val, /*float*/ target, /*float*/ maxMove)
  {
    return /*(double)*/ val > /*(double)*/ target ? CMath.Max(val - maxMove, target) : CMath.Min(val + maxMove, target);
  }

  /*public*/ static /*Vector2*/ Approach_Vector2(/*Vector2*/ val, /*Vector2*/ target, /*float*/ maxMove)
  {
    if (/*(double)*/ maxMove === 0.0 || val.Equals(target))
      return val;
    /*Vector2*/ let vector2 = target["-"](val);
    if (/*(double)*/ vector2.Length() < /*(double)*/ maxMove)
      return target;
    vector2.Normalize();
    return val["+"](vector2)["*"](maxMove);
  }

  /*public*/ static /*T*/ Lerp(/*T*/ a, /*T*/ b, /*float*/ t, /*T*/ dst)
  {
    if (typeof a === "number") return CCalc.Lerp_float(a, b, t, dst);
    if (a instanceof CVector2) return CCalc.Lerp_Vector2(a, b, t, dst);
    throw new CArgumentException("Invalid argument type.");
  }

  static Lerp_float(a, b, t, dst)
  {
    return (b - a) * t + a;
  }

  static Lerp_Vector2(a, b, t, dst)
  {
    dst = dst || new CVector2();
    dst.X = CCalc.Lerp_float(a.X, b.X, t);
    dst.Y = CCalc.Lerp_float(a.Y, b.Y, t);
    return dst;
  }

    /*public*/ static /*float*/ Map(/*float*/ val, /*float*/ min, /*float*/ max, /*float*/ newMin = 0.0, /*float*/ newMax = 1)
    {
      return /*(float)*/ ((/*(double)*/ val - /*(double)*/ min) / (/*(double)*/ max - /*(double)*/ min) * (/*(double)*/ newMax - /*(double)*/ newMin)) + newMin;
    }

    /*public*/ static /*float*/ SineMap(/*float*/ counter, /*float*/ newMin, /*float*/ newMax)
    {
      return CCalc.Map(/*(float)*/ CMath.Sin(/*(double)*/ counter), -1, 1, newMin, newMax);
    }

    /*public*/ static /*float*/ ClampedMap(/*float*/ val, /*float*/ min, /*float*/ max, /*float*/ newMin = 0.0, /*float*/ newMax = 1)
    {
      return CMathHelper.Clamp(/*(float)*/ ((/*(double)*/ val - /*(double)*/ min) / (/*(double)*/ max - /*(double)*/ min)), 0.0, 1) * (newMax - newMin) + newMin;
    }

};

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
      seed = CCalc.RandomUint32();
    this.mt = [seed];
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

CRandom = class CRandom extends CMersenneTwister {

  /*public*/ /*T*/ Choose_Array/*<T>*/(/*params T[]*/ choices)
  {
    return choices[this.Next(choices.length)];
  }

  /*public*/ /*T*/ Choose_List/*<T>*/(/*List<T>*/ choices)
  {
    return choices.At(this.Next(choices.Count));
  }

  /*public*/ /*T*/  Choose(...args)
  {
    if (args.length >= 1) {
      if (args.length > 1) {
        return CCalc.GiveMe(this.Next(CCalc.Length(args)), ...args);
      } else if (args[0] instanceof CList) {
        return this.Choose_List(args[0]);
      } else if (args[0] != null && args[0][Symbol.iterator] != null) {
        return this.Choose_Array(args[0]);
      } else {
        return args[0];
      }
    }
  }

  /*public*/ /*int*/ Range_int(/*int*/ min, /*int*/ max)
  {
    return min + this.Next(max - min);
  }

  /*public*/ /*float*/ Range_float(/*float*/ min, /*float*/ max)
  {
    return min + this.NextFloat(max - min);
  }

  /*public*/ /*Vector2*/ Range_Vector2(/*Vector2*/ min, /*Vector2*/ max)
  {
    return new CVector2(
      min.X + this.NextFloat(max.X - min.X),
      min.X + this.NextFloat(max.Y - min.Y));
  }

  /*public*/ /*T*/ Range(/*T*/ min, /*T*/ max)
  {
    if (min instanceof CVector2) return this.Range_Vector2(min, max);
    if (typeof min === "number") return this.Range_float(min, max);
    throw new CArgumentException("Invalid argument type.");
  }

  /*public*/ /*int*/ Facing()
  {
    return /*(double)*/ this.NextFloat() < 0.5 ? -1 : 1;
  }

  /*public*/ /*bool*/ Chance(/*float*/ chance)
  {
    return /*(double)*/ this.NextFloat() < /*(double)*/ chance;
  }

  /*public*/ /*float*/ NextFloat(/*float*/ max = 1.0)
  {
    return super.NextFloat() * max;
  }

  /*public*/ /*float*/ NextAngle()
  {
    return super.NextFloat() * 6.283185;
  }

  /*public*/ /*Vector2*/ ShakeVector()
  {
    throw new CNotImplementedException();
    //return new Vector2((float) this.Choose<int>(Calc.shakeVectorOffsets), (float) random.Choose<int>(Calc.shakeVectorOffsets));
  }
}
