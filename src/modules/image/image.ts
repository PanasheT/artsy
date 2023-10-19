import { SESSION } from '../../..';
import { IMAGE_CONFIG } from '../../config';
import assertImageCreation from '../../util/assertion/assert-image-creation';
import createImageContext from '../../util/generation/create-image-context';
import dirtyHash from '../../util/hash/dirty-hash';
import sha256 from '../../util/hash/sha256';
import { TLoadedImages, TImageSaveContext } from './image.types';

export class Image {
  constructor(loadedImages: TLoadedImages, filename: string) {
    assertImageCreation(loadedImages, filename);

    const hash = this.getHash(loadedImages);

    if (SESSION.alreadyHashed(hash)) {
      throw new Error(
        `Image already made with DNA = ${hash}, skipping generation...`
      );
    }

    this.filename = filename;
    this.loadedImages = loadedImages;
    this.buffer = this.getBuffer();
    this.hash = hash;
  }

  public readonly buffer: Buffer;
  public readonly filename: string;
  public readonly hash: string;
  public readonly loadedImages: TLoadedImages;

  public getSaveContext(): TImageSaveContext {
    return {
      data: this.buffer,
      filename: this.filename,
      hash: this.hash,
    };
  }

  private getBuffer(): Buffer {
    const [{ canvas, ctx }, { width, height }] = [
      createImageContext(),
      IMAGE_CONFIG,
    ];

    this.loadedImages.forEach(({ image }) => {
      ctx.drawImage(image, 0, 0, width, height);
    });

    return canvas.toBuffer('image/png');
  }

  private getHash(loadedImages = this.loadedImages): string {
    return sha256(dirtyHash(loadedImages));
  }
}
