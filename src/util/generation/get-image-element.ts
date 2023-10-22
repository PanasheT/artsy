import { TLayerElements } from '../../modules/layer';
import { TFileProperties } from '../../modules/path';
import { getRandomFileByRarity } from './get-random-file-by-rarity';

export default function getImageElementBasedOnRarity(
  layerElements: TLayerElements
): TFileProperties {
  if (layerElements.length == 1) {
    return layerElements[0];
  }

  const tRarity = getTotalRarity(layerElements);
  let selected: TFileProperties | undefined;

  do {
    selected = getRandomFileByRarity(layerElements, tRarity);
  } while (!selected === true);

  return selected!;
}

function getTotalRarity(layerElements: TLayerElements): number {
  return layerElements.reduce(
    (initial, element) => initial + element.rarity,
    0
  );
}
