const express = require("express");
const {addReview,removeReview}=require("../controllers/review.controllers.js");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/addReview",addReview);
router.delete("/removeReview",authMiddleware,removeReview)
module.exports=router;