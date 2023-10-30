import path from 'node:path';

export abstract class PathConstants {
  public static readonly BASE = process.cwd();

  public static readonly BUILD = path.join(PathConstants.BASE, 'build');

  public static readonly IMAGES = path.join(PathConstants.BUILD, 'images');

  public static readonly JSON = path.join(PathConstants.BUILD, 'json');

  public static readonly LAYERS = path.join(PathConstants.BASE, 'layers');
}
