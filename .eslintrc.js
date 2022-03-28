module.exports = {
  /**
   * @see https://eslint.org/docs/user-guide/configuring/configuration-files#cascading-and-hierarchy
   */
  root: true,
  /**
   * @see https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
   */
  env: {
    browser: true,
    node: true,
    amd: true,
    es6: true,
    es2020: true,
    // jest: true,
    // 'jest/globals': true,
    jquery: false
  },
  extends: [
    /**
   /**
   * @see https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js
   */
    'eslint:recommended',

    /**
     * @see https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app
     */
    'react-app',

    /**
     * @see https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app#jest-rules
     */
    // 'react-app/jest',

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react
     */
    'plugin:react/recommended',

    /**
     * @see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
     */
    'plugin:react-hooks/recommended',

    /**
     * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
     */
    'plugin:jsx-a11y/recommended',

    /**
     * @see https://github.com/jest-community/eslint-plugin-jest
     */
    // 'plugin:jest/all',

    /**
     * @see https://github.com/gajus/eslint-plugin-flowtype
     */
    // 'plugin:flowtype/recommended',

    /**
     * @see https://github.com/prettier/eslint-plugin-prettier
     */
    'plugin:prettier/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      presets: [
        /**
         * @see https://babeljs.io/docs/en/babel-preset-react
         */
        '@babel/preset-react'

        /**
         * @see https://babeljs.io/docs/en/babel-preset-flow
         */
        // '@babel/preset-flow',
      ]
    },
    requireConfigFile: false,
    sourceType: 'module'
  },

  /**
   * @see https://eslint.org/docs/user-guide/configuring/plugins#configuring-plugins
   */
  plugins: [
    /**
     * @see https://www.npmjs.com/package/@babel/eslint-plugin
     */
    '@babel',

    /**
     * @see https://www.npmjs.com/package/eslint-plugin-import
     */
    'import',

    /**
     * @see https://www.npmjs.com/package/eslint-plugin-react
     */
    'react',

    /**
     * @see https://www.npmjs.com/package/eslint-plugin-react-hooks
     */
    'react-hooks',

    /**
     * @see https://github.com/jest-community/eslint-plugin-jest
     */
    'jest',

    /**
     * @see https://www.npmjs.com/package/eslint-plugin-flowtype
     */
    // 'flowtype',

    /**
     * @see https://www.npmjs.com/package/eslint-plugin-jsx-a11y
     */
    'jsx-a11y',

    /**
     * @see https://www.npmjs.com/package/eslint-config-prettier
     */
    'prettier'
  ],
  /**
   * @see https://eslint.org/docs/user-guide/configuring/configuration-files#adding-shared-settings
   */
  settings: {
    /**
     * @see https://www.npmjs.com/package/eslint-plugin-import#user-content-importcore-modules
     */
    'import/core-modules': [],

    /**
     * @see https://www.npmjs.com/package/eslint-plugin-import#user-content-importignore
     */
    'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react#configuration
     */
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
      // flowVersion: '0.53', // Flow version
    },

    /**
     * @see https://github.com/jest-community/eslint-plugin-jest#jest-version-setting
     */
    jest: {
      // version: require('jest/package.json').version,
    }
  },

  rules: {
    'no-confusing-arrow': ['error', {allowParens: true}], // https://eslint.org/docs/rules/no-confusing-arrow
    'no-console': 'warn', // https://eslint.org/docs/rules/no-console
    'no-var': 'warn', // https://eslint.org/docs/rules/no-var
    'object-shorthand': 'error', // https://eslint.org/docs/rules/object-shorthand
    'prefer-const': 'warn', // https://eslint.org/docs/rules/prefer-const
    'prefer-template': 'warn', // https://eslint.org/docs/rules/prefer-template
    'prettier/prettier': 'error', // https://github.com/prettier/eslint-plugin-prettier#installation
    'react/react-in-jsx-scope': 'off', // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks - https://fr.reactjs.org/docs/hooks-rules.html#eslint-plugin
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies - https://fr.reactjs.org/docs/hooks-rules.html#eslint-plugin
    quotes: ['error', 'single'], // https://eslint.org/docs/rules/quotes
    'comma-dangle': [
      // https://eslint.org/docs/rules/comma-dangle
      'error',
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
    ]
  }
};
