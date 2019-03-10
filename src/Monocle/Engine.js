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

CArgumentException = class CArgumentException extends Error {
}

CArgumentNullException = class CArgumentNullException extends Error {
}

CEnvironment = class CEnvironment {
  static get IsRunningOnWindows() {
    return false;
  }
};

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

CEngine = class CEngine {
  static get Instance() {
    return CEngine._Instance ||
      (CEngine._Instance = new CEngine());
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
};
