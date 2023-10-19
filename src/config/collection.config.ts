type TCollectionConfig = Readonly<{
  name: string;
  author: string;
  description: string;
}>;

export const COLLECTION_CONFIG: TCollectionConfig = {
  name: "ProjectX",
  author: "Panashe Innocent Tafuma",
  description: "I have nothing cool to write...",
} as const;
