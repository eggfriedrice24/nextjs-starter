import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import checkFile from 'eslint-plugin-check-file';
import n from 'eslint-plugin-n';
import tailwindcss from 'eslint-plugin-tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier',
    'plugin:tailwindcss/recommended'
  ),
  {
    rules: {
      'prefer-arrow-callback': ['error'],
      'prefer-template': ['error'],
      semi: ['error'],
      'n/no-process-env': ['error'],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/!^[.*': 'KEBAB_CASE',
        },
      ],
    },
    plugins: { tailwindcss, n, 'check-file': checkFile },
  },
];

export default eslintConfig;
