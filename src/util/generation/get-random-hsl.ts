import { randomInt } from 'crypto';

export type HSLString = `hsl(${number}, ${number}%, ${number}%)`;

export function getRandomHSL(): HSLString {
  const { hue, saturation, lightness } = randomHSL();

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function randomHSL() {
  return {
    hue: randomInt(361),
    saturation: randomInt(101),
    lightness: randomInt(101),
  };
}
