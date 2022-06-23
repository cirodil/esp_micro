// install express with `npm install express`
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/temp", function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let temp = req.body;
  res.json(temp);
});

app.listen(3000, () => {
  console.log("Application listening on port 3333!");
});

module.exports = app;
