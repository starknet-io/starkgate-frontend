import {resolve} from 'path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

type ViteConfigInput = {
  mode: string;
};

export default ({mode}: ViteConfigInput) => {
  const prodMode = mode === 'production';

  return defineConfig({
    plugins: [
      dts({
        insertTypesEntry: true,
        outputDir: 'dist/types'
      })
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'StarkGateShared',
        formats: ['es', 'cjs'],
        fileName: 'index'
      },
      sourcemap: !prodMode,
      copyPublicDir: false
    }
  });
};
