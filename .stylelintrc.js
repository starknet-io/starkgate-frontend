module.exports = {
  extends: [
    'stylelint-config-css-modules',
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  ignoreFiles: ['**/*.js', '**/*.jsx'],
  rules: {
    'property-no-unknown': [
      true,
      {ignoreProperties: ['/^color/', 'scrollWidth', 'mainOffset', 'primaryFont']}
    ],
    'selector-pseudo-class-no-unknown': [true, {ignorePseudoClasses: ['export']}],
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$|^Mui*',
    'selector-pseudo-element-no-unknown': [true, {ignorePseudoElements: ['input-placeholder']}],
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'no-empty-source': null,
    'shorthand-property-no-redundant-values': null,
    'string-quotes': 'single',
    'scss/dollar-variable-pattern': ['/^color/', {ignore: 'global'}],
    'scss/at-import-partial-extension': null,
    'scss/comment-no-empty': null,
    'scss/double-slash-comment-empty-line-before': null,
    'prettier/prettier': [true, {severity: 'warning'}],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-same-name-blockless'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'function',
          'tailwind',
          'apply',
          'responsive',
          'variants',
          'screen'
        ]
      }
    ]
  }
};
