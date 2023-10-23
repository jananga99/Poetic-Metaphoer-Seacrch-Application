const express = require("express");
const { searchByTerm } = require("./services/search_service");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/search", async (req, res, next) => {
  const searchOption = req.body.searchOption;
  const searchTerm = req.body.searchTerm;
  try {
    const searchResults = await searchByTerm(searchOption, searchTerm);
    res.render("index", { searchResults, error: null });
  } catch (err) {
    next(err);
  }
});

app.use((req, res) => {
  res.render("index", { searchResults: null, error: null });
});

app.use((err) => {
  res.render("index", {
    searchResults: null,
    error: "An error occurred while searching.",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
