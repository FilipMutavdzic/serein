import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  { ignores: ["node_modules/**", ".next/**", "dist/**"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Next.js best practices (Core Web Vitals)
  nextPlugin.configs["core-web-vitals"],

  {
    rules: {
      // keep things calm; no noisy rules that stop builds
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "no-console": "off"
    }
  }
];
