import { TSystemPaths } from '../../modules/path';
import { getBase } from './get-base';

export default function getPath(type: TSystemPaths, filename: string): string {
  if (filename.charAt(0) === '/') {
    filename = filename.slice(1);
  }

  const base = getBase(type);

  return base.concat('/', filename);
}
