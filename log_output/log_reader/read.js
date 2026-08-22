import express from 'express';
import * as fs from 'node:fs/promises';

const app = express();

const PORT = 3000;

app.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile('../files/server.log', { encoding: 'utf8' });
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send(data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
