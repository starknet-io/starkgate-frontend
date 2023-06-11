const {execSync} = require('child_process');

const devApp = process.argv[2];

const sequentialExecution = async (...commands) => {
  if (commands.length === 0) {
    return 0;
  }

  execSync(commands.shift(), {stdio: 'inherit'});

  return sequentialExecution(...commands);
};

sequentialExecution(
  `pnpm turbo run build --filter=@${devApp}^...`,
  `pnpm turbo run dev --filter=@${devApp}`
);
