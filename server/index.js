const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("data.db");

db.exec(`
CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY,
  name TEXT,
  level INTEGER DEFAULT 1,
  interval REAL DEFAULT 1.0
);
`);

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/question", (req, res) => {
  const count = parseInt(req.query.count || 3);

  let nums = [];
  for (let i = 0; i < count; i++) {
    nums.push(rand(-9, 9));
  }

  res.json({
    numbers: nums,
    answer: nums.reduce((a, b) => a + b, 0)
  });
});

app.listen(3000, () => console.log("Server running on 3000"));
