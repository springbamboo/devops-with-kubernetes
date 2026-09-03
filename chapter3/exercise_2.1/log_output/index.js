import express from 'express';
import { randomBytes } from 'node:crypto';

const app = express();

const PORT = process.env.PORT || 3000;
const PINGPONG_URL = process.env.PINGPONG_URL;

const generateAndPrint = () => {
  let currentRandomString = randomBytes(16).toString('hex');

  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${currentRandomString}` + '\n';
};

app.get('/', async (_req, res) => {
  const pingRes = await fetch(`${PINGPONG_URL}/pings`);
  const pingResJson = await pingRes.json();
  const output = `<div>${generateAndPrint()}</div><div>Ping / Pongs: ${pingResJson.count}</div>`;
  res.send(output);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
