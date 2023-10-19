import assertImageCreation from "../../util/assert-image-creation";
import { TLoadedImages } from "./image.types";

export class Image {
  constructor(loadedImages: TLoadedImages, filename: string) {
    assertImageCreation(loadedImages, filename);
    this.filename = filename;
    this.loadedImages = loadedImages;
  }

  public readonly filename: string;
  public readonly loadedImages: TLoadedImages;
}
