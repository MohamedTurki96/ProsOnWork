module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'import', 'unused-imports'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/', '*.config.js', 'src/style/'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-unescaped-entities': 0,
    'unused-imports/no-unused-imports': 0,
    'import/order': 0/*[
      'warn',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc', caseInsensitive: true },
      },
    ]*/,
    "sort-imports": 0/*[
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreCase: true,
        },
      ]*/,
  },
};
