import express from 'express';
import fs from 'node:fs/promises';

const app = express();
const PORT = process.env.PORT;

let count = 0;

const filePath = '/usr/src/app/file/counter.txt';
// const filePath = './counter.txt';

app.get('/pingpong', async (_req, res) => {
  count += 1;
  try {
    await fs.writeFile(filePath, count.toString());
  } catch (err) {
    console.log(err);
  }
  res.send(`<p>pong ${count}</p>`);
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
