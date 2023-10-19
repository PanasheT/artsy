import { existsSync, promises } from "fs";
import logger from "./logger";

export default async function rmdir(path: string): Promise<void> {
  if (!existsSync(path)) {
    throw new Error(`Cannot remove directory ${path}. Path not found.`);
  }

  await promises.rm(path, { recursive: true });
  logger(`Directory successfully removed: ${path}`);
}
