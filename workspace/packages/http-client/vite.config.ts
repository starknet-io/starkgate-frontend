import {createRequire} from 'module';
import {resolve} from 'path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

const require = createRequire(import.meta.url);
const {peerDependencies, dependencies} = require('./package.json');

type ViteConfigInput = {
  mode: string;
};

export default ({mode}: ViteConfigInput) => {
  const prodMode = mode === 'production';
  const external = [...Object.keys(peerDependencies || {}), ...Object.keys(dependencies || {})];

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
        name: 'WebAppsHttpClient',
        formats: ['es', 'cjs'],
        fileName: 'index'
      },
      rollupOptions: {
        output: {
          strict: false
        },
        external
      },
      sourcemap: !prodMode,
      copyPublicDir: false
    }
  });
};
