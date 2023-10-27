import assertPathExists from '../../util/assertion/assert-path-exists';
import { promises } from 'fs';
import { TFileProperties } from './path.types';
import getRarityFromFilename from '../../util/generation/get-rarity-from-filename';
import path from 'path';

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

    return filenames.map((filename, id) => this.mapper(filename, id));
  }

  private mapper(filename: string, id: number | string): TFileProperties {
    return {
      id,
      filename,
      name: filename.slice(0, filename.lastIndexOf('.')),
      path: path.join(this.path, filename),
      rarity: getRarityFromFilename(filename),
    };
  }
}
