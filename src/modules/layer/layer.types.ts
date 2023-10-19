import { TFileProperties } from '../path';

export type TLayer = Readonly<{
  elements: Array<TFileProperties>;
  elementCount: number;
  id: number | string;
  name: string;
}>;
