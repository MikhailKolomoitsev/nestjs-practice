module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': ['error', { "endOfLine": "auto" }, { usePrettierrc: true }],  // Use our .prettierrc file as source
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    "simple-import-sort/exports": "error"
  },
  'roots': [
    '<rootDir>/src'
  ],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'moduleNameMapper': {
    '@alias/(.*)': '<rootDir>/src/path/to/alias/$1'
  }

};
