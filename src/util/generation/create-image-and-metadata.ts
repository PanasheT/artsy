import { DiskUtility } from '../../modules/disk-utility';
import { TLoadedImages, Image } from '../../modules/image';
import { Metadata } from '../../modules/metadata';

export default function createImageAndMetdata(
  loadedImages: TLoadedImages,
  filename: number | string
): void {
  const image = new Image(loadedImages, `${filename}`);
  const metadata = new Metadata(image);
  const utility = new DiskUtility(image, metadata);
  utility.writeImageAndMetadata();
}
