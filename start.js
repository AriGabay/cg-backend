const { spawn } = require('child_process');

const isDevelopment = require('os').hostname().includes('local');

const env = isDevelopment ? 'development' : 'production';
const server = spawn('node', ['server.js'], {
  env: {
    ...process.env,
    NODE_ENV: env,
  },
});

console.log(`Starting server in ${env} mode...`);

server.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});
