import { writeFileSync } from 'fs';
import getPath from '../../util/directory/get-path';
import { Image } from '../image';
import { Metadata } from '../metadata';
import logger from '../../util/logger';
import { SESSION } from '../../..';
import assertDiskUtilityCreation from '../../util/assertion/assert-disk-utility-creation';
import { IMAGE_CONFIG } from '../../config';
import { CompiledImages } from '../compiled-images';

export class DiskUtility {
  constructor(
    private readonly image: Image,
    private readonly metadata: Metadata
  ) {
    assertDiskUtilityCreation(image, metadata);

    this.image = image;
    this.metadata = metadata;
  }

  public static async writeCompiledImages(): Promise<void> {
    const { width, height } = IMAGE_CONFIG;

    if (width !== height) {
      logger(
        `\nTIP: For better compiled image generation use square ratios. Your height and width are set to ${height}, ${width} respectively.`,
        'Yellow'
      );
    }

    const image = new CompiledImages();

    const imageBuffer = await image.generate();

    if (!imageBuffer) {
      throw new Error('Failed to generate buffer for compiled images');
    }

    const savePath = getPath('Images', `_images.png`);
    writeFileSync(savePath, imageBuffer);

    logger(`Compiled images successfully: ${savePath}`);
  }

  public static writeCompiledMetadata(): void {
    const metadata = SESSION.getMetadata();

    if (!metadata.length) {
      throw new Error('Failed to compile Metadata. Metadata list is empty.');
    }

    const savePath = getPath('JSON', `_metadata.json`);
    writeFileSync(savePath, JSON.stringify(metadata, null, 2));

    logger(`Compiled metadata successfully: ${savePath}`);
  }

  public writeImageAndMetadata(): void {
    this.writeImage();
    this.writeMetadata();
  }

  private writeImage(): void {
    const { data, filename, hash } = this.image.getSaveContext();
    const savePath = getPath('Images', `${filename}.png`);
    writeFileSync(savePath, data);

    SESSION.addHashedImage(hash, savePath);

    logger(`Image successfully created: ${savePath}`, 'Green');
  }

  private writeMetadata(): void {
    const { data, filename } = this.metadata.getSaveContext();
    const savePath = getPath('JSON', `${filename}.json`);
    writeFileSync(savePath, JSON.stringify(data, null, 2));

    SESSION.addMetadata(data);

    logger(`Metadata successfully created: ${savePath}`, 'Blue');
  }
}
