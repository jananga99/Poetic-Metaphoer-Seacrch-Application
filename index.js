const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { searchResults: null, error: null });
});

app.post("/search", async (req, res) => {
  console.log(req.body);
  const searchTerm = req.body.searchTerm;
  try {
    // const response = await axios.get(`YOUR_SEARCH_API_URL/${searchTerm}`);
    const response = {
      data: [
        {
          id: "John",
          name: "Cena",
        },
        {
          id: "John",
          name: "Cena",
        },
        {
          id: "John",
          name: "Cena",
        },
      ],
    };
    const searchResults = response.data;
    res.render("index", { searchResults, error: null });
  } catch (error) {
    res.render("index", {
      searchResults: null,
      error: "An error occurred while searching.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
