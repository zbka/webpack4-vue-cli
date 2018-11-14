module.exports = {
    'root': true,
    'env': {
      'browser': true
    },
    'extends': [
      'standard',
      'plugin:vue/recommended'
    ],
    'globals': {
      'bridge': true,
      'chrome': true,
      'localStorage': true,
      'HTMLDocument': true
    },
    'rules': {
      'indent': 0,
      'vue/script-indent': 0,
      'vue/html-indent': 0,
      'vue/max-attributes-per-line': 0,
      'vue/html-closing-bracket-newline': ['error', {
        'singleline': 'never',
        'multiline': 'always'
      }]
    }
  }