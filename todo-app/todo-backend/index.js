import express from 'express';
import fsPromise from 'node:fs/promises';
import fs from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { randomUUID } from 'node:crypto';

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

const todoList = [];

app.post('/todos', async (req, res) => {
  if (!req.body.task) {
    return res.status(400).json({ message: 'task is required' });
  }
  const todo = {
    task: req.body.task,
    createdAt: new Date(),
    id: randomUUID(),
  };
  todoList.push(todo);
  return res.status(201).json(todo);
});

app.get('/todos', async (_req, res) => {
  return res.status(200).json({ todos: todoList });
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
