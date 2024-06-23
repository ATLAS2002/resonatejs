/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@config/eslint/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
};
