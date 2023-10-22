export function delay(time = 10000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
