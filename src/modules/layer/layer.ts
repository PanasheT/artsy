import { LAYERS_CONFIG, TLayerConfig } from "../../config";
import { PathConstants } from "../../constants";
import { Path } from "../path";
import { TLayer } from "./layer.types";

export class Layer extends Path {
  constructor() {
    super(PathConstants.LAYERS);
  }

  private readonly CONFIG: TLayerConfig = LAYERS_CONFIG;

  public async getSetup(): Promise<Array<TLayer>> {
    const setup = this.CONFIG.layersOrder
      .map(({ name }) => name)
      .map(async (name, id) => {
        const path = new Path(this.path.concat(`/${name}`));
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
