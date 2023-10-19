import { promises } from "fs";

export default async function mkdir(path: string): Promise<void> {
  await promises.mkdir(path, { recursive: true });
  console.log("Directory successfully created: %s", path);
}
