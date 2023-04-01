module.exports = {
  '**/*.ts': 'tsc',
  '**/*.{ts,js}': ['eslint --fix'],
  '**/*.{md,yml,json,prettierrc}': ['prettier --write']
}
