const express = require("express");
const {getImageTags,uploadImage}=require("../controllers/imagga.controllers");
const router = express.Router();

router.post("/getImageTags",getImageTags);
router.post("/upload",uploadImage);
module.exports=router;
