import { randomInt } from 'crypto';
import { TLayerElements } from '../../modules/layer';
import { TFileProperties } from '../../modules/path';
import { shuffleArray } from '../shuffle-array';

export function getRandomFileByRarity(
  arr: TLayerElements
): TFileProperties | undefined {
  const shuffled = shuffleArray([...arr]);
  const rarityUpperLimit = getHighestRarity([...arr]) + 1;

  const [rElement, rNum] = [
    shuffled[randomInt(shuffled.length)],
    randomInt(rarityUpperLimit),
  ];

  return rNum >= rElement.rarity ? rElement : undefined;
}

function getHighestRarity(arg: Array<TFileProperties>): number {
  let highest = arg[0].rarity;

  if (arg.length == 1) {
    return highest;
  }

  for (let i = arg.length - 1; i > 0; i--) {
    if (arg[i].rarity > highest) {
      highest = arg[i].rarity;
    }
  }

  return highest;
}
