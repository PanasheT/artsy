import { LAYERS_CONFIG as config } from '../../config';
import { TLayer } from '../../modules/layer';
import logger from '../logger';
import createImageAndMetdata from './create-image-and-metadata';
import getImageLayerStack from './get-image-layer-stack';

export default async function generationLoop(
  setup: Array<TLayer>
): Promise<{ passed: number; failed: number }> {
  let [passed, failed] = [0, 0];

  while (passed < config.collectionSize) {
    const loadedImages = await getImageLayerStack(setup);

    try {
      createImageAndMetdata(loadedImages, passed + 1);
    } catch (err: any) {
      logger(err, 'Red');
      failed++;
      continue;
    }

    ++passed;
  }

  return { passed, failed };
}
