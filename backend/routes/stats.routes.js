const express = require("express");
const router = express.Router();
const {numberOfUsers,numberOfRecipes}=require("../controllers/stats.controllers");

router.get("/numberOfUsers",numberOfUsers);
router.get("/numberOfRecipes",numberOfRecipes);


module.exports=router;