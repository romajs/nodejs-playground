module.exports = {
  env: {
    es6: true,
  },
  extends: 'standard',
  ignorePatterns: ['node_modules/**/*.js'],
  plugins: ['require-sort'],
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
    semi: ['error', 'always'],
    // 'require-sort/require-sort': [
    //   'error',
    //   {
    //     ignoreCase: true,
    //     ignoreDeclarationSort: false,
    //     ignorePropertySort: false,
    //     propertySyntaxSortOrder: ['none', 'multiple', 'single'],
    //   },
    // ],
  },
};
