type TLayerDirectory = {
  name: string;
};

export type TLayerConfig = Readonly<{
  collectionSize: number;
  layersOrder: Readonly<Array<TLayerDirectory>>;
}>;

export const LAYERS_CONFIG: TLayerConfig = {
  collectionSize: 1000,
  layersOrder: [
    { name: 'SKIN' },
    { name: 'NOSE' },
    { name: 'MOUTH' },
    { name: 'EYES' },
    { name: 'HEAD' },
  ] as const,
} as const;
