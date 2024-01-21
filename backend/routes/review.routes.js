const express = require("express");
const {addReview,removeReview,getReviews}=require("../controllers/review.controllers.js");
const router = express.Router();

router.post("/addReview",addReview);
router.delete("/removeReview/:id",removeReview)
router.get("/getReviews",getReviews);
module.exports=router;