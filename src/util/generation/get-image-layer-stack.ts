import { loadImage } from 'canvas';
import { TLayer, TLayers } from '../../modules/layer';
import { TLoadedImage } from '../../modules/image';
import getImageElementBasedOnRarity from './get-image-element';

export default async function getImageLayerStack(
  layers: TLayers
): Promise<Array<TLoadedImage>> {
  return await Promise.all(layers.map(loadImages));
}

async function loadImages(layer: TLayer): Promise<TLoadedImage> {
  const file = getImageElementBasedOnRarity(layer.elements);

  return {
    fileProperties: file,
    image: await loadImage(file.path),
  };
}
