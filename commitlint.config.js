module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['angular', 'api', 'email', 'lerna', 'travis', 'circle']
    ]
  }
};
