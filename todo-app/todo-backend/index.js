import express from 'express';
import fsPromise from 'node:fs/promises';
import fs from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const filePath = process.env.IMAGE_FILE_PATH;
// const filePath = '/home/czw/devops-with-kubernetes/todo-app/files/image.jpg';
const TEN_SECONDS = process.env.TIME_TEN_SECONDS;

async function requestAndSaveImage() {
  const response = await fetch(process.env.REQUEST_IMAGE_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  await pipeline(
    Readable.fromWeb(response.body),
    fs.createWriteStream(filePath),
  );
}

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

app.post('/todos', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'task is required' });
    }
    const todo = await prisma.task.create({
      data: {
        task: req.body.task,
      },
    });

    return res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/todos', async (_req, res) => {
  try {
    const result = await prisma.task.findMany();
    return res.status(200).json({ todos: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
