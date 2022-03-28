module.exports = {
  branches: [
    'master',
    {
      name: 'dev',
      prerelease: true
    }
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          {breaking: true, release: 'major'},
          {revert: true, release: 'patch'},
          // MINOR
          {type: 'feat', release: 'minor'},
          {type: 'feature', release: 'minor'},
          // PATCH
          {type: 'fix', release: 'patch'},
          {type: 'bugfix', release: 'patch'},
          {type: 'hotfix', release: 'patch'},
          {type: 'perf', release: 'patch'},
          {type: 'refactor', release: 'patch'},
          {type: 'improvement', release: 'patch'},
          {type: 'revert', release: 'patch'},
          {type: 'style', release: 'patch'},
          {type: 'docs', release: 'patch'},
          {type: 'ci', release: 'patch'},
          {type: 'test', release: 'patch'},
          // NO RELEASE
          {type: 'chore', release: false},
          {type: 'ci', release: false},
          {type: 'build', release: false},
          {type: 'prerelease', release: false},
          {type: 'release', release: false},
          {scope: 'no-release', release: false}
        ]
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        // Using conventionalcommits here since the angular preset does not allow custom
        // types for release notes generation.
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            {type: 'breaking', section: 'Breaking'},
            {type: 'feat', section: '🧩 Features'},
            {type: 'feature', section: '🧩 Features'},
            {type: 'fix', section: '🔧 Fixes'},
            {type: 'bugfix', section: '🔧 Fixes'},
            {type: 'hotfix', section: '🔧 Fixes'},
            {type: 'perf', section: '💉 Improvements'},
            {type: 'refactor', section: '💉 Improvements'},
            {type: 'improvement', section: '💉 Improvements'},
            {type: 'style', section: '💉 Improvements'},
            {type: 'docs', section: '📚 Docs'},

            {type: 'chore', section: '⚙ Internals', hidden: true},
            {type: 'ci', section: '⚙ Internals', hidden: true},
            {type: 'build', section: '⚙ Internals', hidden: true},
            {
              type: 'release',
              section: '⚙ Internals',
              hidden: true
            },
            {
              type: 'prerelease',
              section: '⚙ Internals',
              hidden: true
            }
          ]
        }
      }
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'yarn.lock', 'CHANGELOG.md'],
        message:
          "<%= branch === 'dev' ? 'prerelease' : 'release' %>: <%= nextRelease.gitTag %> -  <%= new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Jerusalem', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) %> \n\n <%= nextRelease.notes %>"
      }
    ],
    '@semantic-release/github'
  ],
  repositoryUrl: 'https://github.com/starkware-libs/starkgate-frontend'
};
