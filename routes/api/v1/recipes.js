const router = require('express').Router();

const recipes = require('../../../data/recipes.json');

/*
GET /api/v1/
Return summary of all recipes
(id, title, image, prepTime, difficulty)
*/
router.get('/', (req, res) => {
  const summary = recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    prepTime: recipe.prepTime,
    difficulty: recipe.difficulty
  }));

  res.json(summary);
});

/*
GET /api/v1/recipe/:id
Return full recipe object
*/
router.get('/recipe/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const recipe = recipes.find(r => r.id === id);

  res.json(recipe);
});

/*
POST /api/v1/recipe/add
Add a new recipe
*/
router.post('/recipe/add', (req, res) => {
  const newId = Math.max(...recipes.map(r => r.id)) + 1;

  const newRecipe = {
    id: newId,
    ...req.body
  };

  recipes.push(newRecipe);

  res.json(newRecipe);
});

module.exports = router;