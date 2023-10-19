import { Image } from 'canvas';
import { TFileProperties } from '../path';

export type TLoadedImage = Readonly<{
  fileProperties: TFileProperties;
  image: Image;
}>;

export type TLoadedImages = Readonly<Array<TLoadedImage>>;

export type TImageSaveContext = Readonly<{
  data: Buffer;
  filename: string;
  hash: string;
}>;
