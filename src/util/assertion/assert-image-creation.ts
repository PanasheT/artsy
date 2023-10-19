import { LAYERS_CONFIG } from "../../config";
import { TLoadedImages } from "../../modules/image";

export default function assertImageCreation(
  loadedImages: TLoadedImages,
  filename: string
): void {
  if (
    !Array.isArray(loadedImages) ||
    loadedImages.length !== LAYERS_CONFIG.layersOrder.length
  ) {
    throw new Error(
      "Each image must contain an element from each layer in /layers directory"
    );
  }

  if (typeof filename !== "string" || !filename.length) {
    throw new Error("Invalid filename for image");
  }
}
