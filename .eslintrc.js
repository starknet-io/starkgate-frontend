module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    amd: true,
    es6: true,
    es2020: true,
    jquery: false
  },
  extends: [
    'eslint:recommended',
    'react-app',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react']
    },
    requireConfigFile: false,
    sourceType: 'module'
  },
  plugins: ['@babel', 'import', 'react', 'react-hooks', 'jest', 'jsx-a11y', 'prettier'],
  settings: {
    'import/core-modules': [],
    'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
    },
    jest: {
      // version: require('jest/package.json').version,
    }
  },
  rules: {
    'no-confusing-arrow': ['error', {allowParens: true}],
    'no-console': 'warn',
    'no-var': 'warn',
    'object-shorthand': 'error',
    'prefer-const': 'warn',
    'prefer-template': 'warn',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    quotes: ['error', 'single', {avoidEscape: true}],
    'comma-dangle': [
      'off',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore'
      }
    ],
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true
      }
    ],
    'prefer-destructuring': [
      'warn',
      {
        object: true,
        array: false
      }
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off'
  }
};
