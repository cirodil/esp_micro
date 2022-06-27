const express = require("express");
const { Deta } = require("deta");

const deta = Deta(process.env.SECRET_KEY);
const db = deta.Base("Temp");

const app = express();
app.use(express.json());

// Запрос списка показаний из базы данных
app.get("/", async (req, res) => {
  const { value: items } = await db.fetch([]).next();
  items.length !== 0 ? res.json(items) : res.send("No sensor data");
});

// Создание новой записи в базе данных
app.post("/temp", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { temp } = req.body;
  let date = new Date().toLocaleString("ru-Ru", { timeZone: "Europe/Moscow" });
  const toCreate = { temp, date };
  const insertedTemp = await db.put(toCreate, (key = null), { expireIn: 300 });

  res.status(201).json(insertedTemp);
});

app.listen(3000, () => {
  console.log("Application listening on port 3000!");
});

module.exports = app;
