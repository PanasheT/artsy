import { writeFileSync } from "fs";
import assertDiskUtilityCreation from "../../util/assert-disk-utility-creation";
import getPath from "../../util/get-path";
import { Image } from "../image";
import { Metadata } from "../metadata";
import logger from "../../util/logger";

export class DiskUtility {
  constructor(image: Image, metadata: Metadata) {
    assertDiskUtilityCreation(image, metadata);

    this.image = image;
    this.metadata = metadata;
  }

  private readonly image: Image;
  private readonly metadata: Metadata;

  public writeImageAndMetadata(): void {
    this.writeImage();
    this.writeMetadata();
  }

  private writeImage(): void {
    const { data, filename } = this.image.getSaveContext();
    const savePath = getPath("Images", filename);
    writeFileSync(savePath, data);

    logger(`Image successfully created: ${savePath}`, "Green");
  }

  private writeMetadata(): void {
    const { data, filename } = this.metadata.getSaveContext();
    const savePath = getPath("JSON", filename);
    writeFileSync(savePath, JSON.stringify(data, null, 2));

    logger(`Metadata successfully created: ${savePath}`, "Blue");
  }
}
