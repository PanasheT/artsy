import { Image } from "./../../modules/image/image";
import { Metadata } from "../../modules/metadata";
import dirtyHash from "../hash/dirty-hash";

export default function assertDiskUtilityCreation(
  image: Image,
  metadata: Metadata
): void {
  if (!(image instanceof Image) || !(metadata instanceof Metadata)) {
    throw new Error(
      "Disk Utility requires an Image and its corresponding Metadata"
    );
  }

  if (image.filename !== metadata.filename) {
    throw new Error("Image and Metadata filenames must correspond!");
  }

  if (dirtyHash(image.loadedImages) !== dirtyHash(metadata.loadedImages)) {
    throw new Error(
      "Image and Metadata filenames must correspond to the same layer combination!"
    );
  }
}
