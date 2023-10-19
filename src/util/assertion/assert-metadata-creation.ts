import { Image } from "../../modules/image";

export default function assertMetadataCreation(image: Image): void {
  if (!(image instanceof Image)) {
    throw new Error(
      "Metadata requires a corresponding image for instantiation"
    );
  }
}
