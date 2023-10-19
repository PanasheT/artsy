import { randomInt } from "crypto";
import { loadImage } from "canvas";
import { TLayer } from "../../modules/layer";
import { TLoadedImage } from "../../modules/image";

export default async function getImageLayerStack(
  setup: Array<TLayer>
): Promise<Array<TLoadedImage>> {
  const loadedImages = setup.map(async (layer) => {
    const file = layer.elements[randomInt(layer.elementCount)];

    return {
      fileProperties: file,
      image: await loadImage(file.path),
    };
  });

  return await Promise.all(loadedImages);
}
