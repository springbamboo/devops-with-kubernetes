import { randomBytes } from 'node:crypto';
import * as fs from 'node:fs/promises';

const generateAndPrint = () => {
  let currentRandomString = randomBytes(16).toString('hex');

  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${currentRandomString}` + '\n';
};

async function writeLog() {
  try {
    await fs.mkdir('../files', { recursive: true });
    await fs.appendFile('../files/server.log', generateAndPrint());
  } catch (err) {
    console.log(err);
  }
}

writeLog();

setInterval(() => {
  writeLog();
}, 5000);
