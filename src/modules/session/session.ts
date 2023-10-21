import { TMetadata } from '../metadata';

export class Session {
  private constructor() {}

  public static getInstance(): Session {
    if (!Session.instance) {
      Session.instance = new Session();
    }

    return Session.instance;
  }

  public static instance: Session;

  private readonly hashedImages = new Set<string>();
  private readonly imagePathList: Array<string> = [];
  private readonly metadataList: Array<TMetadata> = [];

  public getMetadata() {
    return [...this.metadataList];
  }

  public addMetadata(arg: TMetadata): void {
    this.metadataList.push(arg);
  }

  public getImagePathList(): Array<string> {
    return [...this.imagePathList];
  }

  public addHashedImage(hash: string, savePath: string): void {
    const oldLength = this.hashedImages.size;
    this.hashedImages.add(hash);
    const newLength = this.hashedImages.size;

    if (newLength - oldLength === 1) {
      this.imagePathList.push(savePath);
    }
  }

  public alreadyHashed(hash: string): boolean {
    return this.hashedImages.has(hash);
  }
}
