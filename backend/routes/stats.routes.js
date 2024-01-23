const express = require("express");
const router = express.Router();
const {numberOfUsers,numberOfRecipes,totalSavedRecipes}=require("../controllers/stats.controllers");

router.get("/numberOfUsers",numberOfUsers);
router.get("/numberOfRecipes",numberOfRecipes);
router.get("/totalSavedRecipes",totalSavedRecipes);


module.exports=router;