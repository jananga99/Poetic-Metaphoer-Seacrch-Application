const express = require("express");
const { searchByTerms, searchAll } = require("./services/search_service");
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
  const submit = req.body.submit
  const metaphors_only = req.body.metaphors_only ? true:false
  delete req.body.submit
  delete req.body.metaphors_only
  searchOptions.forEach((value)=>{
    if(req.body[value])   searchData[value] = value==="metaphor_count" ?   parseInt(req.body[value]):req.body[value]
  })
  try {
    let searchResults;
    if(submit === "search-all"){
      searchResults = await searchAll(onlyMetaphors=metaphors_only);
    }else if(submit === "search"){
      searchResults = await searchByTerms(searchData, onlyMetaphors=metaphors_only);
    } else {
      throw new Error("Unknown submit option")
    }
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
