import { CanvasRenderingContext2D, createCanvas } from 'canvas';
import { IMAGE_CONFIG, LAYERS_CONFIG } from '../../config';
import getRowsForCompiledImage from './get-rows';
import { getRandomHSL } from './get-random-hsl';

export default function createImageContext() {
  const { width, height } = IMAGE_CONFIG;

  const canvas = createCanvas(width, height);
  let ctx = canvas.getContext('2d');

  ctx = addBackgroundToCTX(ctx);
  ctx.fillRect(0, 0, width, height);

  return {
    canvas,
    ctx,
  };
}

function addBackgroundToCTX(ctx: CanvasRenderingContext2D) {
  const { background } = IMAGE_CONFIG;

  if (background.generate) {
    if (background.randomise) {
      ctx.fillStyle = getRandomHSL();
    } else {
      ctx.fillStyle = background.default;
    }
  }

  return ctx;
}

export function createCompiledImageContext() {
  let { width, height } = IMAGE_CONFIG;
  const imagesPerRow = getRowsForCompiledImage();

  const extraRows = Math.ceil(
    (LAYERS_CONFIG.collectionSize - imagesPerRow ** 2) / imagesPerRow
  );

  [width, height] = [imagesPerRow * width, (imagesPerRow + extraRows) * height];

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillRect(0, 0, width, height);

  return {
    canvas,
    ctx,
  };
}
