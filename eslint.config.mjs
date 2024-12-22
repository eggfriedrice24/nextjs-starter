import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
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
    },
    plugins: { tailwindcss },
  },
];

export default eslintConfig;
