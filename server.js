const express = require("express");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Up on ${port}`);
});
