import { TLayerElements } from '../../modules/layer';
import { TFileProperties } from '../../modules/path';
import { getRandomFileByRarity } from './get-random-file-by-rarity';

export default function getImageElementBasedOnRarity(
  layerElements: TLayerElements
): TFileProperties {
  if (layerElements.length == 1) {
    return layerElements[0];
  }

  let selected: TFileProperties | undefined;

  do {
    selected = getRandomFileByRarity(layerElements);
  } while (!selected === true);

  return selected!;
}
