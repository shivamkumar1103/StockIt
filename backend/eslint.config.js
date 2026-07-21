import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-console": "warn", // Warns you about console logs
      "no-unused-vars": "warn", // Warns about unused variables
      semi: ["error", "always"], // Enforces semicolons
      quotes: ["error"], // Enforces single quotes
    },
  },
];
