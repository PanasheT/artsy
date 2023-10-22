import { COLLECTION_CONFIG } from './src/config';
import { Layer, TLayers } from './src/modules/layer';
import { delay } from './src/util/delay';
import { getHighestRarity } from './src/util/generation';
import logger from './src/util/logger';

(async () => await rarityAnalysis())();

async function rarityAnalysis() {
  const myLayer = new Layer();
  const setup = await myLayer.getSetup();

  logger(`
  HOW THIS WORKS: 
  Each element of a particular has a rarity assigned to it.
  The default rarity is ${COLLECTION_CONFIG.defaultRarity}
  The chance being considered in this analysis considers the upper limit of the rarities in the given layer.
  Given the rarity of an element of a layer and the upper limit rarity for the same layer,
  What is the likelihood a pseudo-random number generator will generate a number greater than or equal an elements rarity and at most the upper rarity limit of the layer?`);

  delay().then(() => display(setup));
}

function display(arg: TLayers): void {
  logger('RUNNING RARITY ANALYSIS:', 'Blue');

  arg.map(({ name, elements }) => {
    const upperRarity = getHighestRarity(elements);
    logger(`LAYER: ${name} - UPPER LIMIT FOR RARITY IS ${upperRarity}`);

    elements.forEach((file) => {
      const CHANCE = Number(
        ((upperRarity + 1 - file.rarity) / (upperRarity + 1)).toFixed(4)
      );

      console.table({
        ELEMENT: file.filename,
        RARITY: file.rarity,
        CHANCE,
      });
    });
  });
}
