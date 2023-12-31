const express = require("express");
const router = express.Router();
const {addRecipe,deleteRecipe,searchRecipes}=require("../controllers/recipe.controllers");

router.post('/addRecipe',addRecipe);
router.delete('/deleteRecipe/:id',deleteRecipe);
router.get('/searchRecipes',searchRecipes);
module.exports=router;