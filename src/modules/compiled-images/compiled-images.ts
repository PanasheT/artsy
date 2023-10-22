import { Image } from 'canvas';
import { SESSION } from '../../..';
import getImagesFromPathList from '../../util/generation/get-images-from-path-list';
import { IMAGE_CONFIG, LAYERS_CONFIG } from '../../config';
import { createCompiledImageContext } from '../../util/generation';
import getRowsForCompiledImage from '../../util/generation/get-rows';

export class CompiledImages {
  constructor() {
    const IMAGES = SESSION.getImagePathList();

    if (!IMAGES) {
      throw new Error("'No individual images to compile'");
    }

    this.imagePathList = IMAGES;
  }

  private readonly imagePathList: Array<string>;
  private images: Array<Image> = [];

  public async generate(): Promise<Buffer> {
    await this.setImages();

    if (!this.images.length) {
      throw new Error('No individual images to compile');
    }

    const { rows, columns, extraRows } = this.getDimensions();

    return this.getBuffer(rows + extraRows, columns);
  }

  private getDimensions() {
    const rows = getRowsForCompiledImage();
    const columns = getRowsForCompiledImage();

    const extraRows = Math.ceil(
      (LAYERS_CONFIG.collectionSize - rows * columns) / rows
    );

    return {
      rows,
      columns,
      extraRows,
    };
  }

  private getBuffer(rows: number, columns: number): Buffer {
    const [{ canvas, ctx }, { width, height }] = [
      createCompiledImageContext(),
      IMAGE_CONFIG,
    ];

    let imageIndex = 0;
    let image: Image | undefined = this.images[imageIndex];

    for (let row = 0; row <= rows; row++) {
      if (!image) break;
      for (let column = 0; column < columns; column++) {
        image = this.images[imageIndex];
        if (!image) break;
        ctx.drawImage(image, column * width, row * height, width, height);
        imageIndex++;
      }
    }

    return canvas.toBuffer('image/png');
  }

  private async setImages(): Promise<void> {
    this.images = await getImagesFromPathList(this.imagePathList);
  }
}
