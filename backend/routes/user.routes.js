const express = require("express");
const router = express.Router();
const { addReward, upload_image, get_user,update_image,saveRecipe,unsaveRecipe,getSavedRecipes } = require("../controllers/user.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authMiddlewareForUpload } = require("../middlewares/authupload.middleware");

router.post('/addReward/:userId/:recipeId', authMiddleware, addReward);
router.post('/upload-image', authMiddlewareForUpload, upload_image);
router.post('/update_image',authMiddlewareForUpload,update_image);
router.post('/saveRecipe/:userId/:recipeId',saveRecipe);
router.post('/unsaveRecipe/:userId/:recipeId',unsaveRecipe);
router.post('/getSavedRecipes/:userId',getSavedRecipes);

router.get("/get-user", get_user);

module.exports = router;