import { createCanvas } from "canvas";
import { IMAGE_CONFIG } from "../config";

export default function createImageContext() {
  const { width, height, background } = IMAGE_CONFIG;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  //TODO: Generate random background
  if (background.generate) {
    ctx.fillStyle = background.default;
  }

  ctx.fillRect(0, 0, width, height);

  return {
    canvas,
    ctx,
  };
}
