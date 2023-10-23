export type TAttribute = Readonly<{
  trait: string;
  value: string;
}>;

export type TAttributes = Array<Readonly<TAttribute>>;

export type TMetadata = Readonly<{
  attributes: TAttributes;
  author: 'Panashe Innocent Tafuma';
  compiler: 'Artsy';
  description: string;
  dna: string;
  edition: number;
  name: string;
}>;

export type TMetadataSaveContext = Readonly<{
  data: TMetadata;
  filename: string;
}>;
