const express = require("express");
const {addReview,removeReview}=require("../controllers/review.controllers.js");
const router = express.Router();

router.post("/addReview",addReview);
router.delete("/removeReview",removeReview)
module.exports=router;