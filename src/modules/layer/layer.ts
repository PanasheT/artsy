import { LAYERS_CONFIG, TLayerConfig } from '../../config';
import { PathConstants } from '../../constants';
import { Path } from '../path';
import { TLayers } from './layer.types';
import * as npath from 'node:path';

export class Layer extends Path {
  constructor() {
    super(PathConstants.LAYERS);
  }

  private readonly CONFIG: TLayerConfig = LAYERS_CONFIG;

  public async getSetup(): Promise<TLayers> {
    const setup = this.CONFIG.layersOrder.map(async ({ name }, id) => {
      const path = new Path(npath.join(this.path, name));
      const elements = await path.getAllFileProperties();

      return {
        id,
        name,
        elements,
        elementCount: elements.length,
      };
    });

    return await Promise.all(setup);
  }
}
