import js from '@eslint/js'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import eslintImport from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    ignores: ['dist'],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parser: typescriptParser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      prettier,
      import: eslintImport,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      // ESLint rules
      'no-console': 'warn',
      eqeqeq: ['error', 'smart'],
      curly: ['error', 'all'],
      'no-else-return': 'error',
      'no-undef': 'error',
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],

      // TypeScript-specific rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // React-specific rules
      'react/jsx-key': 'warn',
      'react/self-closing-comp': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'import/no-default-export': 'error',

      // Prettier integration
      'prettier/prettier': [
        'warn',
        { singleQuote: true, trailingComma: 'es5', tabWidth: 2, semi: false },
      ],
    },
  },
  {
    files: [
      '**/*.stories.{js,jsx,ts,tsx}',
      'eslint.config.js',
      '.storybook/*.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]
