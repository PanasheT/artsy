import { COLLECTION_CONFIG, LAYERS_CONFIG } from '../../config';
import assertMetadataCreation from '../../util/assertion/assert-metadata-creation';
import { Image, TLoadedImages } from '../image';
import { TAttributes, TMetadata, TMetadataSaveContext } from './metadata.types';

export class Metadata {
  constructor(
    image: Image,
    private readonly CONFIG = LAYERS_CONFIG
  ) {
    assertMetadataCreation(image);

    this.filename = image.filename;
    this.loadedImages = image.loadedImages;
    this.dna = image.hash;
  }

  private readonly dna: string;
  public readonly filename: string;
  public readonly loadedImages: TLoadedImages;

  public getSaveContext(): TMetadataSaveContext {
    return {
      data: this._metadata,
      filename: this.filename,
    };
  }

  public get _metadata(): TMetadata {
    return {
      attributes: this._attributes,
      author: 'Panashe Innocent Tafuma',
      compiler: 'Artsy',
      description: COLLECTION_CONFIG.description,
      dna: this.dna,
      edition: parseInt(this.filename, 10),
      name: `${COLLECTION_CONFIG.name} #${this.filename}`,
    };
  }

  public get _attributes(): TAttributes {
    return this.CONFIG.layersOrder.map(({ name }, index) => ({
      trait: name,
      value: this.getTraitValue(this.loadedImages[index].fileProperties.name),
    }));
  }

  private getTraitValue(value: string): string {
    return value.lastIndexOf(COLLECTION_CONFIG.rarityDelimiter) == -1
      ? value
      : value.slice(0, value.lastIndexOf(COLLECTION_CONFIG.rarityDelimiter));
  }
}
