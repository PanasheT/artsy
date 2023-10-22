export type TFileProperties = Readonly<{
  id: number | string;
  filename: string;
  name: string;
  path: string;
  rarity: number;
}>;

export type TSystemPaths = 'Base' | 'Build' | 'Images' | 'JSON' | 'Layers';
