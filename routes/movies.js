const express = require("express");
const router = express.Router();

const movies = [
  { id: 0, name: "First Movie" },
  { id: 1, name: "Second Movie" },
  { id: 2, name: "Third Movie" },
  { id: 3, name: "Fourth Movie" },
];

router.get("/", (req, res) => {
  res.send(movies);
});

router.get("/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.filter((movie) => movie.id === movieId);

  if (movieId > 3) {
    return res.status(404).send([]);
  }

  res.send(movie);
});

module.exports = router;
