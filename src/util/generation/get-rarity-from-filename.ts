import { COLLECTION_CONFIG } from '../../config';

export default function getRarityFromFilename(filename: string): number {
  const rarity = parseInt(extractRarity(filename), 10);
  return isNaN(rarity) ? COLLECTION_CONFIG.defaultRarity : rarity;
}

function extractRarity(filename: string): string {
  if (filename.includes(COLLECTION_CONFIG.rarityDelimiter)) {
    return filename.slice(
      filename.lastIndexOf(COLLECTION_CONFIG.rarityDelimiter) + 1,
      filename.lastIndexOf('.')
    );
  }

  return '';
}
