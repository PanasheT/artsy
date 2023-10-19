import { promises } from "fs";
import logger from "./logger";

export default async function mkdir(path: string): Promise<void> {
  await promises.mkdir(path, { recursive: true });
  logger(`Directory successfully created: ${path}`, "Yellow");
}
