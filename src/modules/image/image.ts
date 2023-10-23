import { Canvas, CanvasRenderingContext2D, Image as CanvasImage } from 'canvas';
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

    const context = createImageContext();

    this.canvas = context.canvas;
    this.ctx = context.ctx;
    this.filename = filename;
    this.loadedImages = loadedImages;
    this.buffer = this.getBuffer();
    this.hash = hash;
  }

  private readonly canvas: Canvas;
  private readonly ctx: CanvasRenderingContext2D;

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
    this.loadedImages.forEach(({ image }) => this.drawImage(image));

    return this.canvas.toBuffer('image/png');
  }

  private drawImage(image: CanvasImage): void {
    const { width, height } = IMAGE_CONFIG;
    this.ctx.drawImage(image, 0, 0, width, height);
  }

  private getHash(loadedImages = this.loadedImages): string {
    return sha256(dirtyHash(loadedImages));
  }
}
