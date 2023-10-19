import { Image } from "canvas";
import { TFileProperties } from "../path";

export type TLoadedImage = Readonly<{
  fileProperties: TFileProperties;
  image: Image;
}>;

export type TLoadedImages = Readonly<Array<TLoadedImage>>;

export type TSaveImageContext = Readonly<{
  data: Buffer;
  filename: string;
  hash: string;
}>;
