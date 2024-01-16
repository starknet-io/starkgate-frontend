import {resolve} from 'path';
import {defineConfig} from 'vite';

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
        name: 'WebAppsUtilsBrowser',
        formats: ['es'],
        fileName: 'index'
      },
      rollupOptions: {
        output: {
          strict: false
        }
      },
      sourcemap: !prodMode,
      copyPublicDir: false
    }
  });
};
