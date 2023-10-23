import { COLLECTION_CONFIG, LAYERS_CONFIG } from '../../config';
import assertMetadataCreation from '../../util/assertion/assert-metadata-creation';
import { Image, TLoadedImages } from '../image';
import { TAttributes, TMetadata, TMetadataSaveContext } from './metadata.types';

export class Metadata {
  constructor(image: Image, private readonly CONFIG = LAYERS_CONFIG) {
    assertMetadataCreation(image);

    this.filename = image.filename;
    this.loadedImages = image.loadedImages;
    this.attributes = this.getAttributes();
    this.data = this.getData();
  }

  public readonly attributes: TAttributes;
  public readonly data: TMetadata;
  public readonly filename: string;
  public readonly loadedImages: TLoadedImages;

  public getSaveContext(): TMetadataSaveContext {
    return {
      data: this.data,
      filename: this.filename,
    };
  }

  private getAttributes(): TAttributes {
    return this.CONFIG.layersOrder.map(({ name }, index) => {
      return {
        trait: name,
        value: this.getTraitValue(this.loadedImages[index].fileProperties.name),
      };
    });
  }

  private getData(): TMetadata {
    return {
      attributes: this.attributes,
      author: 'Panashe Innocent Tafuma',
      compiler: 'Artsy',
      description: COLLECTION_CONFIG.description,
      edition: parseInt(this.filename, 10),
      name: `${COLLECTION_CONFIG.name} #${this.filename}`,
    };
  }

  private getTraitValue(value: string): string {
    if (value.lastIndexOf(COLLECTION_CONFIG.rarityDelimiter) == -1) {
      return value;
    }

    return value.slice(0, value.lastIndexOf(COLLECTION_CONFIG.rarityDelimiter));
  }
}
