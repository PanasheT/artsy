import logger from "../logger";

export default function generationSummary(FAILED: number, PASSED: number) {
  logger(`\nGENERATION SUMMARY:`, "Yellow");
  console.table({ FAILED, PASSED: PASSED - 1 });
}
