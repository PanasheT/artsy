import mkoutputdir from './src/util/directory/make-output-dir';
import { Layer } from './src/modules/layer';
import { DiskUtility } from './src/modules/disk-utility/disk-utility';
import { Session } from './src/modules/session/session';
import generationSummary from './src/util/generation/generation-summary';
import generationLoop from './src/util/generation/generation-loop';

export const SESSION = Session.getInstance();

(async () => {
  await mkoutputdir();
  const layer = new Layer();
  const setup = await layer.getSetup();

  const { passed, failed } = await generationLoop(setup);

  DiskUtility.writeCompiledMetadata();

  generationSummary(failed, passed);
})();
