import { LAYERS_CONFIG as config } from '../../config';
import { TLayer } from '../../modules/layer';
import getErrorMessage from '../get-error-mesasge';
import logger from '../logger';
import createImageAndMetdata from './create-image-and-metadata';
import getImageLayerStack from './get-image-layer-stack';

export default async function generationLoop(
  setup: Array<TLayer>
): Promise<{ passed: number; failed: number }> {
  let [passed, failed] = [0, 0];

  while (passed < config.collectionSize) {
    try {
      const loadedImages = await getImageLayerStack(setup);
      createImageAndMetdata(loadedImages, passed + 1);
    } catch (err) {
      logger(getErrorMessage(err), 'Red');
      failed++;
      continue;
    }
    ++passed;
  }

  return { passed, failed };
}
