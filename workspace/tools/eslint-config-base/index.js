module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier', 'turbo'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'spaced-comment': 'error',
    'no-duplicate-imports': 'error',
    'no-confusing-arrow': ['error', {allowParens: true}],
    'no-console': 'warn',
    'no-var': 'warn',
    'no-unused-vars': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'warn',
    'prefer-template': 'warn',
    'import/no-anonymous-default-export': 'off',
    camelcase: 'warn',
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
    'prefer-destructuring': [
      'warn',
      {
        object: true,
        array: false
      }
    ]
  }
};
