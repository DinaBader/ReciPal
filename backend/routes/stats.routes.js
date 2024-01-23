const express = require("express");
const router = express.Router();
const {numberOfUsers}=require("../controllers/stats.controllers");

router.get("/numberOfUsers",numberOfUsers);


module.exports=router;