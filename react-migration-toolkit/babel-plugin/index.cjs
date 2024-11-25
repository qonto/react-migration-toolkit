module.exports = [
  'babel-plugin-ember-template-compilation',
  {
    transforms: [require.resolve('./transform.cjs')],
    targetFormat: 'hbs',
  },
];
