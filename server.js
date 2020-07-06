const express = require('express');
const nunjucks = require('nunjucks');
const recipes = require('./data');

const server = express();

server.set("view engine", "njk");
server.use(express.static('styles'));

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/', (req, res) => {
  res.render("page-home", {items: recipes});
})

server.get('/about', (req, res) => {
  res.render("page-about");
})

server.get('/recipes/:index', (req, res) => {
  const recipeIndex = req.params.index;

  /* if (!recipes[recipeIndex]) 
    return res.status(404).render("not-found"); */

  return res.render("page-recipes", { recipe: recipes[recipeIndex]});
})

server.listen(3000, () => {
  console.log('Server is Running');
})