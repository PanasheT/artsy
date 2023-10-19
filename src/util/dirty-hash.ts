import { TLoadedImages } from "../modules/image";

export default function dirtyHash(arg: TLoadedImages): string {
  if (!Array.isArray(arg) || !arg.length) {
    throw new Error("Failed to create dirty hash for invalid loaded images");
  }

  return arg
    .map(({ fileProperties }) => fileProperties.name)
    .join("_")
    .trim();
}
