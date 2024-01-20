const express = require("express");
const {getImageTags,uploadImage,upload_image}=require("../controllers/imagga.controllers");
const router = express.Router();

router.post("/getImageTags",getImageTags);

module.exports=router;
