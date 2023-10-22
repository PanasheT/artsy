import { TFileProperties } from '../../modules/path';

export function getHighestRarity(arg: Array<TFileProperties>): number {
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
