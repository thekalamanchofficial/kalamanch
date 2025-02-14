const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "auto",
  jsxSingleQuote: false,
  proseWrap: "preserve",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["^react", "^next(/?.*)", "<THIRD_PARTY_MODULES>", "^@/(.*)", "^~/(.*)", "^[./]"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  overrides: [
    {
      files: "*.{ts,tsx}",
      options: {
        parser: "typescript",
      },
    },
  ],
};

export default config;
