import { Image, loadImage } from 'canvas';
import assertPathExists from './../assertion/assert-path-exists';

export default async function getImagesFromPathList(
  paths: Array<string>
): Promise<Array<Image>> {
  if (!Array.isArray(paths)) {
    throw new Error('Paths must be a valid array');
  }

  if (!paths.length) {
    return [];
  }

  paths.forEach((path) => assertPathExists(path));

  return await Promise.all(paths.map(async (path) => loadImage(path)));
}
