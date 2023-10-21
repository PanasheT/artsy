import { SESSION } from '../../..';
import { IMAGE_CONFIG, LAYERS_CONFIG } from '../../config';
import { createCompiledImageContext } from './create-image-context';
import getImagesFromPathList from './get-images-from-path-list';
import getRowsForCompiledImage from './get-rows';

export default async function generateCompiledImage(): Promise<Buffer> {
  const images = await getImagesFromPathList(SESSION.getImagePathList());

  if (!images.length) {
    throw new Error('No individual images to compile');
  }

  const [{ canvas, ctx }, { width, height }] = [
    createCompiledImageContext(),
    IMAGE_CONFIG,
  ];

  const { collectionSize } = LAYERS_CONFIG;
  const [rows, columns] = [
    getRowsForCompiledImage(),
    getRowsForCompiledImage(),
  ];

  const tImages = rows * columns;
  const extraRows = Math.ceil((collectionSize - tImages) / rows);

  let imageIndex = 0;
  let isImage = true;

  for (let row = 0; row <= rows + extraRows; row++) {
    if (!isImage) break;
    for (let column = 0; column < columns; column++) {
      const image = images[imageIndex];
      if (!image) {
        isImage = false;
        break;
      }
      ctx.drawImage(image, column * width, row * height, width, height);
      imageIndex++;
    }
  }

  return canvas.toBuffer('image/png');
}
