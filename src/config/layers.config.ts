type TLayer = {
  name: string;
};

export type TLayerConfig = Readonly<{
  collectionSize: number;
  layersOrder: Readonly<Array<TLayer>>;
}>;

export const LAYERS_CONFIG: TLayerConfig = {
  collectionSize: 100,
  layersOrder: [
    { name: 'SKIN' },
    { name: 'NOSE' },
    { name: 'MOUTH' },
    { name: 'EYES' },
    { name: 'HEAD' },
  ] as const,
} as const;
