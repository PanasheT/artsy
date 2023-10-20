import { DiskUtility } from './modules/disk-utility';
import { Layer } from './modules/layer';
import mkoutputdir from './util/directory/make-output-dir';
import generationLoop from './util/generation/generation-loop';
import generationSummary from './util/generation/generation-summary';

export default async function main(): Promise<void> {
  await mkoutputdir();
  const layer = new Layer();
  const setup = await layer.getSetup();

  const { passed, failed } = await generationLoop(setup);

  DiskUtility.writeCompiledMetadata();

  generationSummary(failed, passed);
}
