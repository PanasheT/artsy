import { LAYERS_CONFIG as config } from '../../config';

export default function getRowsForCompiledImage(): number {
  return Math.round(Math.sqrt(config.collectionSize));
}
