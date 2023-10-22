import { randomInt } from 'crypto';

export function shuffleArray(arg: Array<any>): Array<any> {
  if (arg.length === 1) {
    return arg;
  }

  for (let cIndex = arg.length - 1; cIndex >= 0; cIndex--) {
    const rIndex = randomInt(arg.length);
    [arg[cIndex], arg[rIndex]] = [arg[rIndex], arg[cIndex]];
  }

  return arg;
}
