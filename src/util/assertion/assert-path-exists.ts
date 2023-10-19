import { existsSync } from 'fs';

export default function assertPathExists(path: string): void {
  if (!existsSync(path)) {
    throw new Error(`Failed to locate: ${path}`);
  }
}
