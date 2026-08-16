import express from 'express';

const app = express();
const PORT = 3000;

let count = 0;

app.get('/pingpong', (req, res) => {
  count += 1;
  res.send(`<p>pong ${count}</p>`);
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
