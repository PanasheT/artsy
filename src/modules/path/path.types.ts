export type TFileProperties = Readonly<{
  id: number | string;
  filename: string;
  name: string;
  path: string;
}>;

export type TSystemPaths = 'Base' | 'Build' | 'Images' | 'JSON' | 'Layers';
