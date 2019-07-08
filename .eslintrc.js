module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-trailing-spaces':'off',
    'arrow-parens': 'off',
    'no-continue': 'off',
    'no-alert': 'off',
    'no-empty': 'off',
    'no-new-object': 'off',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',
    'no-unused-expressions': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
