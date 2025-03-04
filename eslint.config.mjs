import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      'jest.config.js',
      'eslint.config.mjs',
      'next.config.ts',
      'prettier.config.js',
      '.stylelintrc.js',
      '.prettierrc.js',
      ],
  }
];

export default eslintConfig;
