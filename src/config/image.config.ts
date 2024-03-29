type TBackgroundConfig = Readonly<{
  generate: boolean;
  randomise: boolean;
  default: string;
}>;

type TImageConfig = Readonly<{
  width: number;
  height: number;
  background: TBackgroundConfig;
}>;

export const IMAGE_CONFIG: TImageConfig = {
  width: 32,
  height: 32,
  background: {
    generate: true,
    randomise: true,
    default: '#FFFFFF',
  } as const,
} as const;
