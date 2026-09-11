import express from 'express';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs/promises';

const app = express();

const PORT = process.env.PORT || 3000;
const PINGPONG_URL = process.env.PINGPONG_URL || 'http://localhost:3001';
const MESSAGE = process.env.MESSAGE;

const generateAndPrint = () => {
  let currentRandomString = randomBytes(16).toString('hex');

  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${currentRandomString}` + '\n';
};

app.get('/', async (_req, res) => {
  const pingRes = await fetch(`${PINGPONG_URL}/pings`);
  const pingResJson = await pingRes.json();

  const filePath = path.join(process.env.FILE_PATH, 'information.txt');
  const fileContent = await fs.readFile(filePath, 'utf8');

  const output = `<div>file content: ${fileContent}</div><div>env variable: MESSAGE=${MESSAGE}</div><div>${generateAndPrint()}</div><div>Ping / Pongs: ${pingResJson.count}</div>`;
  res.send(output);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
