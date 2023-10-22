import { randomInt } from 'crypto';
import { TLayerElements } from '../../modules/layer';
import { TFileProperties } from '../../modules/path';
import { shuffleArray } from '../shuffle-array';

export function getRandomFileByRarity(
  arr: TLayerElements,
  rarity: number
): TFileProperties | undefined {
  const shuffled = shuffleArray([...arr]);

  const [rElement, rDecimal] = [
    shuffled[randomInt(shuffled.length)],
    Math.random(),
  ];

  const probability = 1 - rElement.rarity / rarity;

  return rDecimal > probability ? rElement : undefined;
}
