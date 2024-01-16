import {createRequire} from 'module';
import {resolve} from 'path';
import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

const require = createRequire(import.meta.url);
const {peerDependencies, dependencies} = require('./package.json');

type ViteConfigInput = {
  mode: string;
};

export default ({mode}: ViteConfigInput) => {
  const prodMode = mode === 'production';
  const generateScopedName = prodMode ? '[hash:base64:10]' : '[name]__[local]___[hash:base64:5]';

  return defineConfig({
    resolve: {
      alias: [
        {find: '@assets', replacement: resolve(__dirname, 'src/assets')},
        {find: '@styles', replacement: resolve(__dirname, 'src/styles')},
        {find: '@hooks', replacement: resolve(__dirname, 'src/hooks')},
        {find: '@components', replacement: resolve(__dirname, 'src/components')},
        {find: '@containers', replacement: resolve(__dirname, 'src/containers')},
        {find: '@providers', replacement: resolve(__dirname, 'src/providers')}
      ]
    },
    plugins: [react(), svgr()],
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName
      }
    },
    build: {
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, 'src/index.jsx'),
        name: 'WebAppsUI',
        formats: ['es'],
        fileName: 'index'
      },
      rollupOptions: {
        external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      },
      sourcemap: !prodMode,
      copyPublicDir: false
    }
  });
};
