import { Image } from '../../modules/image';

export default function assertMetadataCreation(image: Image): void {
  const condition =
    !(image instanceof Image) ||
    !image.hash ||
    !image.filename ||
    !image.loadedImages;

  if (condition) {
    throw new Error(
      'Metadata requires a corresponding image for instantiation'
    );
  }
}
