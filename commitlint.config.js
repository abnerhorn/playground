/**
 * Commitlint Configuration
 * ========================
 *
 * Enforces conventional commit format for all commits.
 *
 * Format: <type>(<scope>): <subject>
 *
 * Types:
 *   feat     - New feature
 *   fix      - Bug fix
 *   docs     - Documentation only
 *   style    - Code style (formatting, semicolons, etc.)
 *   refactor - Code change that neither fixes a bug nor adds a feature
 *   perf     - Performance improvement
 *   test     - Adding or updating tests
 *   build    - Build system or external dependencies
 *   ci       - CI/CD configuration
 *   chore    - Other changes (updating tasks, configs, etc.)
 *   revert   - Reverting a previous commit
 *
 * Examples:
 *   feat(auth): add Google OAuth login
 *   fix(api): handle null user in session
 *   docs: update README with setup instructions
 *   chore: update dependencies
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Customize rules as needed
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'subject-case': [0], // Disable subject case enforcement
    'body-max-line-length': [0], // Disable body line length limit
  },
};

