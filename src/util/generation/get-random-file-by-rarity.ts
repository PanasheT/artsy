import { randomInt } from 'crypto';
import { TLayerElements } from '../../modules/layer';
import { TFileProperties } from '../../modules/path';
import { shuffleArray } from '../shuffle-array';
import { getHighestRarity } from './get-highest-rarity';

export function getRandomFileByRarity(
  arr: TLayerElements
): TFileProperties | undefined {
  const shuffled = shuffleArray([...arr]);
  const rarityUpperLimit = getHighestRarity([...arr]);

  const [rElement, rNum] = [
    shuffled[randomInt(shuffled.length)],
    randomInt(rarityUpperLimit + 1),
  ];

  return rNum >= rElement.rarity ? rElement : undefined;
}
