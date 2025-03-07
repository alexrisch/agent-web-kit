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
    rules: {
      // Enforce max line length of 100 characters
      "max-len": ["error", { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],

      // Enforce JSX props to be either all on one line or each on its own line
      "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],

      // Enforce better JSX indentation
      "react/jsx-indent": ["error", 2],

      // Enforce consistent use of self-closing tags where possible
      "react/self-closing-comp": "error",

      // Disallow multiple spaces in JSX
      "react/jsx-props-no-multi-spaces": "error",

      // Enforce a strict ordering of props
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],

      // Enforce strict TypeScript checks
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/strict-boolean-expressions": "warn",
    },
  },
];

export default eslintConfig;
