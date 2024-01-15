const express = require("express");
const router = express.Router();
const {addRecipe,deleteRecipe,searchRecipes,addRecipePhoto,getRecipe,update_image,getRecipeById}=require("../controllers/recipe.controllers");

router.post('/addRecipe',addRecipe);
router.delete('/deleteRecipe/:id',deleteRecipe);
router.get('/searchRecipes',searchRecipes);
router.post('/addRecipePhoto/:id',addRecipePhoto);
router.post('/update_image/:id',update_image);
router.get('/getRecipeById/:id',getRecipeById);
router.get('/getRecipe',getRecipe);
module.exports=router;