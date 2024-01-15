const express = require("express");
const router = express.Router();
const {addRecipe,deleteRecipe,searchRecipes,addRecipePhoto,getRecipe}=require("../controllers/recipe.controllers");

router.post('/addRecipe',addRecipe);
router.delete('/deleteRecipe/:id',deleteRecipe);
router.get('/searchRecipes',searchRecipes);
router.post('/addRecipePhoto/:id',addRecipePhoto);
router.get('/getRecipe',getRecipe);
module.exports=router;