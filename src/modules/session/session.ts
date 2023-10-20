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
  private readonly metadataList: Array<TMetadata> = [];

  public getMetadata(): Array<TMetadata> {
    return [...this.metadataList];
  }

  public addMetadata(arg: TMetadata): void {
    this.metadataList.push(arg);
  }

  public addHashedImage(hash: string): void {
    this.hashedImages.add(hash);
  }

  public alreadyHashed(hash: string): boolean {
    return this.hashedImages.has(hash);
  }
}
