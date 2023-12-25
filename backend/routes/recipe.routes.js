const express = require("express");
const router = express.Router();
const {addRecipe,deleteRecipe}=require("../controllers/recipe.controllers");

router.post('/addRecipe',addRecipe);
router.delete('/deleteRecipe/:id',deleteRecipe);
module.exports=router;