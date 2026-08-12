import express from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (req, res) => {
  res.send(`<p>hello world</p>`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
