const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers);
      res.render("beers", { beers });
    })
    .catch(error => {
      console.log(error);
    });
  // res.render('beers');
});

app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beer => {
      const fino = beer[0];
      console.log(beer);
      res.render("single-beer", fino);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/beers/:id", (req, res, next) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beers => {
      const fino = beers[0];
      console.log(fino);
      res.render("single-beer", fino);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
