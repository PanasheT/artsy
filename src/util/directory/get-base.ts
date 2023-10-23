import { PathConstants } from '../../constants';
import { TSystemPaths } from '../../modules/path';

export function getBase(type: TSystemPaths): string {
  let base: string;
  switch (type) {
    case 'Base':
      base = PathConstants.BASE;
      break;
    case 'Build':
      base = PathConstants.BUILD;
      break;
    case 'Images':
      base = PathConstants.IMAGES;
      break;
    case 'JSON':
      base = PathConstants.JSON;
      break;
    case 'Layers':
      base = PathConstants.LAYERS;
      break;
  }

  if (!base) {
    throw new Error(
      "To generate a path use the following bases: 'Base' | 'Build' | 'Images' | 'JSON' | 'Layers'"
    );
  }

  return base;
}
