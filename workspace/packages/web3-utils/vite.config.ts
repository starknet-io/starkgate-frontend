import {createRequire} from 'module';
import {resolve} from 'path';
import {defineConfig} from 'vite';

const require = createRequire(import.meta.url);
const {peerDependencies} = require('./package.json');

type ViteConfigInput = {
  mode: string;
};

export default ({mode}: ViteConfigInput) => {
  const prodMode = mode === 'production';

  return defineConfig({
    build: {
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'WebAppsWeb3Utils',
        formats: ['es', 'cjs'],
        fileName: 'index'
      },
      rollupOptions: {
        external: [...Object.keys(peerDependencies)]
      },
      sourcemap: !prodMode,
      copyPublicDir: false
    }
  });
};
