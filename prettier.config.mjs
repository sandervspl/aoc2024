export default {
  trailingComma: 'all',
  arrowParens: 'always',
  singleQuote: true,
  printWidth: 100,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['^types$', '<THIRD_PARTY_MODULES>', '', '^(services)(/.*|$)', '', '^[./]'],
  importOrderParserPlugins: ['typescript'],
  importOrderTypeScriptVersion: '5.3.2',
};
