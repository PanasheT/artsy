import { COLLECTION_CONFIG } from '../../config';
import { TFileProperties } from '../../modules/path';

export function getHighestRarity(arg: Array<TFileProperties>): number {
  return arg.reduce((prev, current) => {
    if (current?.rarity > prev) return current.rarity;
    return prev;
  }, COLLECTION_CONFIG.defaultRarity ?? 1);
}
