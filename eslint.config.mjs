import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Prettier compatibility (disables conflicting rules)
  eslintConfigPrettier,

  // Global ignores
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'public/**',
      '.storybook/**',
      'storybook-static/**',
      'stories/**',
      '*.config.js',
      '*.config.mjs',
      'next-env.d.ts',
    ],
  },

  // Main config for all JS/TS files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
    },
    rules: {
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Next.js rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Allow console in CLI scripts
  {
    files: ['prisma/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  }
);

