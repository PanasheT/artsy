import { randomInt } from 'crypto';

export function shuffleArray(arg: Array<any>): Array<any> {
  arg.forEach((_, cIndex) => {
    const rIndex = randomInt(arg.length);
    [arg[cIndex], arg[rIndex]] = [arg[rIndex], arg[cIndex]];
  });

  return arg;
}
