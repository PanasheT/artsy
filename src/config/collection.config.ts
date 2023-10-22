type TCollectionConfig = Readonly<{
  name: string;
  author: string;
  description: string;
  rarityDelimiter: '#' | '%' | '^';
  defaultRarity: number;
}>;

export const COLLECTION_CONFIG: TCollectionConfig = {
  name: 'ProjectX',
  author: 'Panashe Innocent Tafuma',
  description: 'I have nothing cool to write...',
  rarityDelimiter: '#',
  defaultRarity: 1,
} as const;
