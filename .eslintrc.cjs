module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsdoc/recommended',

    // ! Must be last to override other configs
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: './',
    project: ['./tsconfig.json', './tsconfig.eslint.json']
  },
  plugins: ['@typescript-eslint', 'jsdoc', 'eslint-plugin-tsdoc', 'import', 'prettier'],
  rules: {
    /* ✍️ TSdoc / JSDoc */

    'tsdoc/syntax': 'warn',
    'jsdoc/require-asterisk-prefix': ['error', 'always'],
    'jsdoc/require-jsdoc': ['off'],
    'jsdoc/require-returns': ['off'],
    'jsdoc/require-param': ['off'],
    'jsdoc/require-param-type': ['off'],
    'jsdoc/require-param-description': ['off'],
    'jsdoc/check-tag-names': ['off'],

    /* 🟦 TypeScript */

    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/no-unsafe-argument': ['off'],
    '@typescript-eslint/no-unnecessary-type-assertion': ['off'],
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': true,
        'ts-check': false
      }
    ],
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          '{}': false
        }
      }
    ],

    /* 🖌️ Prettier */

    // 'lines-around-comment': [
    //   'error',
    //   {
    //     beforeBlockComment: true,
    //     afterBlockComment: true,
    //     beforeLineComment: true,
    //     afterLineComment: false,
    //     allowBlockStart: true,
    //     allowBlockEnd: true,
    //     allowObjectStart: false,
    //     allowObjectEnd: true,
    //     allowArrayStart: true,
    //     allowArrayEnd: true
    //   }
    // ],

    // ? This makes eslint find errors and lets prettier handle the indentation.
    'no-tabs': ['error', { allowIndentationTabs: false }],

    /* 🛬 Imports */

    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false
      }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true
      }
    ],
    'import/order': [
      'error',
      {
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'groups': [
          'type',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object'
        ],
        'newlines-between': 'never',
        'pathGroups': [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before'
          }
        ],
        'pathGroupsExcludedImportTypes': ['builtin']
      }
    ]
  },
  settings: {
    /* 🛣️ Paths */

    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        paths: ['src']
      },
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        map: [
          // ['^ts-node-esm-swc$', './src/index.ts'],
          // ['ts-node-esm-swc', './src'],
          ['^@$', './src/index.ts'],
          ['@', './src']
        ]
      }
    }
  }
}
