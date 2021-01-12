const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

// express
const app = express();

// body parser
app.use(bodyParser.json());

// APIs
// lists
app.get("/api/values", function (req, res) {
  db.pool.query("SELECT * FROM lists;", (err, results, fileds) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

// add
app.post("/api/value", function (req, res, next) {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}"`,
    (err, results, fileds) => {
      if (err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5000, () => {
  console.log("App port 5000");
});
