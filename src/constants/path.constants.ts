export abstract class PathConstants {
  public static readonly BASE = process.cwd();

  public static readonly BUILD = PathConstants.BASE.concat('/build');

  public static readonly IMAGES = PathConstants.BUILD.concat('/images');

  public static readonly JSON = PathConstants.BUILD.concat('/json');

  public static readonly LAYERS = PathConstants.BASE.concat('/layers');
}
