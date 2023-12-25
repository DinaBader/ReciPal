const express = require("express");
const router = express.Router();
const {addRecipe}=require("../controllers/recipe.controllers");

router.post('/addRecipe',addRecipe);

module.exports=router;