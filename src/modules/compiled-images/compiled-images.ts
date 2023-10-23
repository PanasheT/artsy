import { Canvas, Image, CanvasRenderingContext2D } from 'canvas';
import { SESSION } from '../../..';
import getImagesFromPathList from '../../util/generation/get-images-from-path-list';
import { IMAGE_CONFIG } from '../../config';
import { createCompiledImageContext } from '../../util/generation';
import getRowsForCompiledImage from '../../util/generation/get-rows';

export class CompiledImages {
  constructor() {
    const IMAGES = SESSION.getImagePathList();

    if (!IMAGES?.length) {
      throw new Error('No images to compile');
    }

    const { canvas, ctx } = createCompiledImageContext();

    this.imagePaths = IMAGES;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  private readonly canvas: Canvas;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly imagePaths: Array<string>;
  private images: Array<Image> = [];

  public async generate(): Promise<Buffer> {
    await this.setImages();

    if (!this.images.length) {
      throw new Error('No images to compile');
    }

    return this.getBuffer();
  }

  private getBuffer(): Buffer {
    this.images.forEach((image, index) => {
      const { row, column } = this.getRowAndColumn(index);
      this.drawImage(image, row, column);
    });

    return this.canvas.toBuffer('image/png');
  }

  private getRowAndColumn(index: number) {
    const rows = getRowsForCompiledImage();
    return {
      row: Math.floor(index / rows),
      column: index % rows,
    };
  }

  private drawImage(image: Image, row: number, column: number): void {
    const { width, height } = IMAGE_CONFIG;
    this.ctx.drawImage(image, column * width, row * height, width, height);
  }

  private async setImages(): Promise<void> {
    this.images = await getImagesFromPathList(this.imagePaths);
  }
}
