const express = require("express");
const router = express.Router();
const { addReward, upload_image, get_user,update_image,get_userImage,saveRecipe,unsaveRecipe,getSavedRecipes,editProfile ,getRewards} = require("../controllers/user.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { authMiddlewareForUpload } = require("../middlewares/authupload.middleware");

router.post('/addReward/:recipeId',authMiddleware, addReward);
router.post('/upload-image', authMiddlewareForUpload, upload_image);
router.post('/update_image',authMiddlewareForUpload,update_image);
router.post('/saveRecipe/:recipeId',authMiddleware,saveRecipe);
router.post('/unsaveRecipe/:recipeId',authMiddleware,unsaveRecipe);
router.get('/getSavedRecipes/:userId',authMiddleware,getSavedRecipes);
router.post('/editProfile/:userId',authMiddleware,editProfile);
router.get("/getRewards", authMiddleware,getRewards);
router.get("/get_userImage",authMiddleware,get_userImage);

router.get("/get-user", get_user);

module.exports = router;