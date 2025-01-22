import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      quotes: ['error', 'single'],
      indent: ['error', 2],
      semi: 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      eqeqeq: 'off',
      'space-in-parens': ['error', 'never'],
      'no-multi-spaces': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  ...tseslint.configs.recommended,
  tseslint.configs.eslintRecommended,
];
