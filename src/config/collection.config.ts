type TCollectionConfig = Readonly<{
  name: string;
  author: string;
  description: string;
  rarityDelimiter: '#' | '%' | '^';
}>;

export const COLLECTION_CONFIG: TCollectionConfig = {
  name: 'ProjectX',
  author: 'Panashe Innocent Tafuma',
  description: 'I have nothing cool to write...',
  rarityDelimiter: '#',
} as const;
