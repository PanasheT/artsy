import { createCanvas } from 'canvas';
import { IMAGE_CONFIG, LAYERS_CONFIG } from '../../config';
import getRowsForCompiledImage from './get-rows';

export default function createImageContext() {
  const { width, height, background } = IMAGE_CONFIG;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  //TODO: Generate random background
  if (background.generate) {
    ctx.fillStyle = background.default;
  }

  ctx.fillRect(0, 0, width, height);

  return {
    canvas,
    ctx,
  };
}

export function createCompiledImageContext() {
  let { width, height } = IMAGE_CONFIG;
  const [rows, columns] = [
    getRowsForCompiledImage(),
    getRowsForCompiledImage(),
  ];

  const extraRow = Math.ceil(
    (LAYERS_CONFIG.collectionSize - rows * columns) / rows
  );

  [width, height] = [rows * width, (columns + extraRow) * height];

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillRect(0, 0, width, height);

  return {
    canvas,
    ctx,
  };
}
