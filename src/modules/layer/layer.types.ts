import { TFileProperties } from '../path';

export type TLayerElements = Array<TFileProperties>;

export type TLayer = Readonly<{
  elements: TLayerElements;
  elementCount: number;
  id: number | string;
  name: string;
}>;

export type TLayers = Array<TLayer>;
