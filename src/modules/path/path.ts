import assertPathExists from '../../util/assertion/assert-path-exists';
import { promises } from 'fs';
import { TFileProperties } from './path.types';
import getRarityFromFilename from '../../util/generation/get-rarity-from-filename';

export class Path {
  constructor(path: string) {
    assertPathExists(path);
    this.path = path;
  }

  public readonly path: string;

  public async getAllFilenames(): Promise<Array<string>> {
    const filenames = await promises.readdir(this.path, { recursive: true });

    if (!filenames.length) {
      throw new Error(`Failed path is empty: ${this.path}`);
    }

    return filenames;
  }

  public async getAllFileProperties(): Promise<Array<TFileProperties>> {
    const filenames = await this.getAllFilenames();

    return filenames.map((filename, id) => {
      return {
        id,
        filename,
        name: filename.split('.')[0],
        path: this.path.concat(`/${filename}`),
        rarity: getRarityFromFilename(filename),
      };
    });
  }
}
