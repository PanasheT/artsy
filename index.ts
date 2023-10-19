import mkoutputdir from "./src/util/make-output-dir";
import { Layer } from "./src/modules/layer";

(async () => {
  await mkoutputdir();

  const layer = new Layer();

  console.log(await layer.getSetup());
})();
