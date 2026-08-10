import { randomBytes } from 'node:crypto';

const generateAndPrint = () => {
  let currentRandomString = randomBytes(16).toString('hex');

  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${currentRandomString}`);
};

generateAndPrint();

setInterval(generateAndPrint, 5000);
