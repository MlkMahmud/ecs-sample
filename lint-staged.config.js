const tscFlags = [
  '--esModuleInterop',
  '--noEmit'
];

module.exports = {
  '**/*.ts': `tsc ${tscFlags.join(' ')}`,
  '**/*.{ts,js}': ['eslint --fix'],
  '**/*.{md,yml,json,prettierrc}': ['prettier --write']
};
