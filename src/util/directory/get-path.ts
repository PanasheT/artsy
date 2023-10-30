import { TSystemPaths } from '../../modules/path';
import { getBase } from './get-base';
import path from 'node:path';

export default function getPath(type: TSystemPaths, filename: string): string {
  if (filename.charAt(0) === '/') {
    filename = filename.slice(1);
  }

  return path.join(getBase(type), filename);
}
