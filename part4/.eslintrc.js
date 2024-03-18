module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'plugins': [
    '@stylistic/js'
  ],
  'extends': 'eslint:recommended',
  'rules': {
    '@stylistic/js/indent': [
      'warn', // Change 'error' to 'warn'
      2
    ],
    '@stylistic/js/linebreak-style': [
      'warn', // Change 'error' to 'warn'
      'unix'
    ],
    '@stylistic/js/quotes': [
      'warn', // Change 'error' to 'warn'
      'single'
    ],
    '@stylistic/js/semi': [
      'warn', // Change 'error' to 'warn'
      'never'
    ],
  }
}