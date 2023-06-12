module.exports = {
  root: true,
  extends: ['react-app', 'react-app/jest'],
  plugins: ['wrap-props', '@typescript-eslint'],
  rules: {
    camelcase: 'off',
    curly: ['error', 'multi-line', 'consistent'],
    'no-shadow': 'off',
    'max-len': ['error', {'code': 160}],
    'wrap-props/unwrap-jsx-props': ['error', {'maxLength': 160}],
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'simple-import-sort/imports': 'off',
  },
  ignorePatterns: ['/node_modules/*', '/dist/*'],
};
