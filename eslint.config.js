const { FlatCompat } = require("@eslint/eslintrc")
const nxEslintPlugin = require("@nx/eslint-plugin")
const eslintPluginImport = require("eslint-plugin-import")
const eslintPluginUnusedImports = require("eslint-plugin-unused-imports")
const js = require("@eslint/js")

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

module.exports = [
  {
    plugins: {
      "@nx": nxEslintPlugin,
      import: eslintPluginImport,
      "unused-imports": eslintPluginUnusedImports,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreCase: true,
        },
      ],
    },
  },
  ...compat.config({ extends: ["plugin:@nx/typescript"] }).map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-declaration-merging": "warn",
      "@typescript-eslint/no-extra-semi": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-inferrable-types": "off",
    },
  })),
  ...compat.config({ extends: ["plugin:@nx/javascript"] }).map((config) => ({
    ...config,
    files: ["**/*.js", "**/*.jsx"],
    rules: {},
  })),
  ...compat.config({ env: { jest: true } }).map((config) => ({
    ...config,
    files: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.spec.js", "**/*.spec.jsx"],
    rules: {},
  })),
  ...compat.config({ parser: "jsonc-eslint-parser" }).map((config) => ({
    ...config,
    files: ["**/*.json"],
    rules: {},
  })),
  { ignores: ["assets/**/*"] },
  {
    ignores: [
      "/dist",
      "/coverage",
      "/.changeset",
      "/.nx/cache",
      "/pnpm-lock.yaml",
      "/apps/*/src/prisma",
    ],
  },
]
