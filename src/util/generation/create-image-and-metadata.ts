import { DiskUtility } from "../../modules/disk-utility";
import { TLoadedImages, Image } from "../../modules/image";
import { Metadata } from "../../modules/metadata";

export default function createImageAndMetdata(
  loadedImages: TLoadedImages,
  passedIndex: number
): void {
  const image = new Image(loadedImages, `${passedIndex}`);
  const metadata = new Metadata(image);
  const utility = new DiskUtility(image, metadata);
  utility.writeImageAndMetadata();
}
