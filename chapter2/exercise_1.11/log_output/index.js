import express from 'express';
import { randomBytes } from 'node:crypto';
import fs from 'node:fs/promises';

const app = express();

const PORT = process.env.PORT;

const filePath = '/usr/src/app/file/counter.txt';

const generateAndPrint = () => {
  let currentRandomString = randomBytes(16).toString('hex');

  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${currentRandomString}` + '\n';
};

app.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    const prefix = generateAndPrint();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send(`${prefix} Ping / Pongs: ${data}`);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
