const express = require("express");
const logger = require("./middleware/logger");
const home = require("./routes/home");
const movies = require("./routes/movies");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(logger);
// Enable (Cross-Origin Resource Sharing) middleware.
app.use(cors());

app.use("/", home);
app.use("/api/movies", movies);

const port = process.env.PORT || 6969;
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`),
);
