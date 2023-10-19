import { createHash } from "crypto";

export default function sha256(arg: string): string {
  return createHash("sha256").update(arg).digest("hex");
}
