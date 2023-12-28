const express = require("express");
const router = express.Router();
const { addReward } = require("../controllers/user.controllers");

router.post('/addReward/:userId/:recipeId', addReward);

module.exports = router;

