import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

let count = 0;

app.get('/pingpong', async (_req, res) => {
  count += 1;
  res.send(`<p>pong ${count}</p>`);
});

app.get('/pings', async (_req, res) => {
  res.json({ count: count });
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
