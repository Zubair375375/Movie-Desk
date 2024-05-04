const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "movieschema",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const mySQL =
    "INSERT INTO movietable (movienames, moviereviews) VALUES (?,?)";

  db.query(mySQL, [movieName, movieReview], (err, result) => {
    console.log(err);
  });
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movietable";
  db.query(sqlSelect, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.send(results);
      console.log(results);
    }
  });
});

// app.delete(`/api/delete/:movie&&:review`, (req, res) => {
//   const movie = req.params.movie;
//   const review = req.params.review;
//   console.log("Deleting:", movie, review);
//   const sqlDelete =
//     "DELETE FROM movietable WHERE movienames = ? AND moviereviews = ?";
//   db.query(sqlDelete, [movie, review], (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Error deleting movie review");
//     } else {
//       res.status(200).send(`${movie} and ${review} deleted successfully`);
//       console.log(results);
//     }
//   });
// });
app.delete("/api/delete/:movie/:review", (req, res) => {
  const name = req.params.movie;
  const review = req.params.review;
  const sqlDelete =
    "DELETE FROM movietable WHERE movienames = ? AND moviereviews = ?";

  db.query(sqlDelete, [name, review], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting movie review");
    } else {
      if (results.affectedRows > 0) {
        res.status(200).send("Movie review deleted successfully");
      } else {
        res.status(404).send("Movie review not found");
      }
    }
  });
});

app.put("/api/update", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const mySQLUPDATE =
    "UPDATE movietable SET moviereviews = ? WHERE movienames = ?";

  db.query(mySQLUPDATE, [movieReview, movieName], (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
