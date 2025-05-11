import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import headers from 'eslint-plugin-headers';
import i18next from 'eslint-plugin-i18next';
import i18n from '@m6web/eslint-plugin-i18n';

export default tseslint.config(
  { ignores: ['dist', 'src/routeTree.gen.ts'] },
  {
    plugins: {
      i18next: i18next,
      i18n: i18n,
    },
    rules: {
      ...i18next.configs['flat/recommended'].rules,
      'i18n/no-unknown-key': 'error',
      'i18n/no-text-as-children': [
        'error',
        { ignorePattern: '^\\s?[/.]\\s?$' },
      ],
      'i18n/no-text-as-attribute': ['error', { attributes: ['alt', 'title'] }],
      'i18n/interpolation-data': [
        'error',
        { interpolationPattern: '\\{\\.+\\}' },
      ],
    },
    settings: {
      i18n: {
        principalLangs: [
          {
            name: 'en',
            translationPath: 'src/locales/en/common.json',
          },
        ],
        functionName: 't',
      },
    },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: 'module',
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: react,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      headers: headers,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.flatConfigs.recommended.rules,
      ...importPlugin.flatConfigs.typescript.rules,
      'no-console': 'warn',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off',
      'import/no-named-as-default-member': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'react/no-unescaped-entities': [
        'error',
        {
          forbid: ['>', '}'],
        },
      ],
      'react/no-children-prop': [
        'error',
        {
          allowFunctions: true,
        },
      ],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'headers/header-format': [
        'error',
        {
          source: 'file',
          path: '.actions/ASFLicenseHeader.txt',
        },
      ],
    },
  }
);
