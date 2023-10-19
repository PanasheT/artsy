export abstract class PathConstants {
  public static readonly BASE = process.cwd();

  public static readonly BUILD = PathConstants.BASE.concat("/build");

  public static readonly BUILD_IMAGES = PathConstants.BUILD.concat("/images");

  public static readonly BUILD_JSON = PathConstants.BUILD.concat("/json");

  public static readonly LAYERS = PathConstants.BASE.concat("/layers");
}
