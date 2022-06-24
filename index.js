// install express with `npm install express`
const express = require("express");
const { Deta } = require("deta");

const deta = Deta(process.env.SECRET_KEY);
const db = deta.Base("Sensor");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/temp", async function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const { temp } = req.body;
  const toCreate = { temp };
  const insertedTemp = await db.put(toCreate);

  res.status(201).json(insertedTemp);
});

app.listen(3000, () => {
  console.log("Application listening on port 3333!");
});

module.exports = app;
