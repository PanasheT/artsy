import { existsSync } from "fs";
import { PathConstants } from "../constants";
import rmdir from "./rmdir";
import mkdir from "./mkdir";

export default async function mkoutputdir(): Promise<void> {
  if (existsSync(PathConstants.BUILD)) {
    await rmdir(PathConstants.BUILD);
  }

  await mkdir(PathConstants.BUILD_IMAGES);
  await mkdir(PathConstants.BUILD_JSON);
}
