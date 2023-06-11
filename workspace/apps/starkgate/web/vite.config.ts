import {resolve} from 'path';
import replace from 'rollup-plugin-re';
import {ConfigEnv, defineConfig, loadEnv} from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

export default defineConfig(({mode}: ConfigEnv) => {
  const prodMode = mode === 'mainnet' || mode === 'goerli';
  const isNetlifyBuild = process.env.NETLIFY === 'true';

  if (isNetlifyBuild) {
    // Read envs from the deployment folder
    const [projectName, projectType] = process.env.npm_package_name.substring(1).split('/');
    const commonEnvs = loadEnv(mode, process.cwd());
    const envs = loadEnv(projectType, `../../../../infra/deployment/${projectName}/${mode}`);
    process.env = {...process.env, ...commonEnvs, ...envs};
  }

  return {
    plugins: [
      react(),
      svgr(),
      dynamicImport(),
      VitePluginHtmlEnv({compiler: true}),
      replace({
        patterns: [
          {
            match: /js-sha256/,
            test: 'eval("require(\'crypto\')")',
            replace: "require('crypto')"
          },
          {
            match: /js-sha256/,
            test: 'eval("require(\'buffer\').Buffer")',
            replace: "require('buffer').Buffer"
          }
        ]
      })
    ],
    resolve: {
      alias: [
        {find: '@analytics', replacement: resolve(__dirname, 'src/analytics')},
        {find: '@abis', replacement: resolve(__dirname, 'src/abis')},
        {find: '@api', replacement: resolve(__dirname, 'src/api')},
        {find: '@assets', replacement: resolve(__dirname, 'src/assets')},
        {find: '@config', replacement: resolve(__dirname, 'src/config')},
        {find: '@enums', replacement: resolve(__dirname, 'src/enums')},
        {find: '@hooks', replacement: resolve(__dirname, 'src/hooks')},
        {find: '@providers', replacement: resolve(__dirname, 'src/providers')},
        {find: '@routes', replacement: resolve(__dirname, 'src/routes')},
        {find: '@styles', replacement: resolve(__dirname, 'src/styles')},
        {find: '@utils', replacement: resolve(__dirname, 'src/utils')},
        {find: '@containers', replacement: resolve(__dirname, 'src/components/Containers')},
        {find: '@ui', replacement: resolve(__dirname, 'src/components/UI')},
        {find: '@features', replacement: resolve(__dirname, 'src/components/Features')}
      ]
    },
    define: {
      global: 'window',
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      APP_NAME: JSON.stringify(process.env.npm_package_name)
    },
    build: {
      sourcemap: !prodMode,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  };
});
