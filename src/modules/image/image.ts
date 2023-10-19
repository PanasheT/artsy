import { IMAGE_CONFIG } from "../../config";
import assertImageCreation from "../../util/assert-image-creation";
import createImageContext from "../../util/create-image-context";
import dirtyHash from "../../util/dirty-hash";
import sha256 from "../../util/sha256";
import { TLoadedImages, TImageSaveContext } from "./image.types";

export class Image {
  constructor(loadedImages: TLoadedImages, filename: string) {
    assertImageCreation(loadedImages, filename);

    this.filename = filename;
    this.loadedImages = loadedImages;
    this.buffer = this.getBuffer();
    this.hash = this.getHash();
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

    return canvas.toBuffer("image/png");
  }

  private getHash(): string {
    return sha256(dirtyHash(this.loadedImages));
  }
}
