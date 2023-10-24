const express = require("express");
const { searchByTerms } = require("./services/search_service");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/search", async (req, res, next) => {
  const searchOptions = ["poem_name","poet","line","metaphor_count", "metaphor_in_english", "metaphor_meaning_in_english"]
  const searchData = {}
  searchOptions.forEach((value)=>{
    if(req.body[value])   searchData[value] = value==="metaphor_count" ?   parseInt(req.body[value]):req.body[value]
  })
  try {
    const searchResults = await searchByTerms(searchData);
    res.render("index", { searchResults, error: null, searchData });
  } catch (err) {
    next(err);
  }
});

app.use((req, res) => {
  res.render("index", { searchResults: null, error: null, searchData:null });
});

app.use((err) => {
  res.render("index", {
    searchResults: null,
    error: "An error occurred while searching.",
    searchData: null
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
