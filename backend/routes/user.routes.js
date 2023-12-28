const express = require("express");
const router = express.Router();
const { addReward,upload_image,get_user } = require("../controllers/user.controllers");

router.post('/addReward/:userId/:recipeId', addReward);
router.post("/upload-image",upload_image);
router.get("/get-user",get_user);

module.exports = router;

