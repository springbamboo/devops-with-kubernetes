import express from 'express';
import fsPromise from 'node:fs/promises';
import fs from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

const app = express();
const PORT = process.env.PORT || 5001;

const filePath = path.join('/usr/src/app', 'files', 'image.jpg');
// const filePath = __dirname + '/files/image.jpg';
const TEN_SECONDS = 10 * 1 * 1000;

async function requestAndSaveImage() {
  const response = await fetch('https://picsum.photos/1200');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  await pipeline(
    Readable.fromWeb(response.body),
    fs.createWriteStream(filePath),
  );
}

app.get('/', (_req, res) => {
  res.sendFile(path.join('/usr/src/app/', 'index.html'));
});

app.get('/api/image', async (_req, res) => {
  try {
    const stats = await fsPromise.stat(filePath);
    res.sendFile(filePath);
    if (Date.now() - stats.mtimeMs > TEN_SECONDS) {
      requestAndSaveImage().catch((err) => console.log(err));
    }
  } catch (err) {
    try {
      await requestAndSaveImage();
      res.sendFile(filePath);
    } catch (downloadErr) {
      res.status(500).send('error');
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
