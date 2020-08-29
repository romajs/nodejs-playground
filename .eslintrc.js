module.exports = {
  env: {
    es6: true,
  },
  extends: 'standard',
  plugins: [
    'require-sort',
  ],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'ignore',
      },
    ],
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    semi: [
      'error',
      'always',
    ],
    'require-sort/require-sort': ['error', {
      ignoreCase: false,
      ignoreDeclarationSort: false,
      ignorePropertySort: false,
      propertySyntaxSortOrder: ['none', 'multiple', 'single'],
    }],
  },
};
