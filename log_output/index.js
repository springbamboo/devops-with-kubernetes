import { randomBytes } from 'node:crypto';
import express from 'express';

const app = express();

const PORT = 3000;

const generateAndPrint = () => {
  let currentRandomString = randomBytes(16).toString('hex');

  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${currentRandomString}`;
};

app.get('/', (req, res) => {
  return res.send(generateAndPrint());
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
