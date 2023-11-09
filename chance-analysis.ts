import { COLLECTION_CONFIG } from './src/config';
import { Layer, TLayers } from './src/modules/layer';
import { TFileProperties } from './src/modules/path';
import { delay } from './src/util/delay';
import logger from './src/util/logger';

(async () => await chanceAnalysis())();

async function chanceAnalysis() {
  const myLayer = new Layer();
  const setup = await myLayer.getSetup();

  logger(`HOW THIS WORKS:
  In this rarity analysis, each element within a particular layer is assigned a rarity value. 
  The rarity value is determined based on the rarity delimiter present in the layer name. 
  The analysis checks each individual layer name for the presence of a rarity delimiter and extracts the rarity value from it. 
  If no rarity delimiter is found in the layer name, the default rarity value of ${COLLECTION_CONFIG.defaultRarity} is assigned to the element.
  The analysis focuses on the upper limit of the rarities present in the given layer.
  
  For each element in the layer, we examine its rarity value and compare it to the upper rarity limit of the layer.
  The goal is to determine the likelihood that a pseudo-random number generator will generate a number greater than or equal to the rarity of the element, but no greater than the upper rarity limit of the layer.
  
  By calculating this likelihood, we gain insights into the relative scarcity of each element within the layer. 
  This information can be useful for understanding the distribution and rarity levels within the layer.
  
  Please note that this analysis assumes a uniform distribution of the pseudo-random number generator and does not take into account any specific probabilities or biases associated with the rarity assignment.`);

  delay().then(() => display(setup));
}

function display(arg: TLayers): void {
  logger('RUNNING CHANCE ANALYSIS:', 'Blue');

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

function getHighestRarity(arg: Array<TFileProperties>): number {
  return arg.reduce((prev, current) => {
    if (current?.rarity > prev) return current.rarity;
    return prev;
  }, COLLECTION_CONFIG.defaultRarity ?? 1);
}
