const User = require("../models/user.model");
const Recipe = require("../models/recipe.model");
const mongoose=require("mongoose")
const findByIdAndUpdate = async (userId, update) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });

    if (!updatedUser) {
      console.log(`User not found.`);
      return null;
    }

    console.log(`User updated successfully.`);
    return updatedUser;
  } catch (error) {
    console.error('couldnt update user:', error);
    throw error;
  }
};

const addReward = async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.recipeId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    const existingReward = user.rewards.find((reward) => String(reward.country) === String(recipe.country));

    if (existingReward) {
      return res.status(400).send("Reward already exists for this recipe");
    }

    const finishedRecipeIndex = user.finshed_recipes.findIndex((finishedRecipe) => String(finishedRecipe.recipe) === String(recipeId));

    if (finishedRecipeIndex !== -1) {
      user.finshed_recipes[finishedRecipeIndex].completed = true;
    }

    user.rewards.push({ recipe: recipeId, country: recipe.country });
    await user.save();

    res.status(200).send({ message: "Reward added successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

const saveRecipe = async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.recipeId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.saved = user.saved || [];

    const isRecipeSaved = user.saved.some(savedRecipe => savedRecipe.recipe.toString() === recipeId);

    if (isRecipeSaved) {
      return res.status(400).json({ error: 'Recipe already saved' });
    }

    const recipe = await Recipe.findById(recipeId, 'image name');

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    user.saved.push({
      title: recipe.name,
      recipe: recipeId,
      image: recipe.image,
    });

    await user.save();

    return res.status(200).json({ message: 'Recipe saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const unsaveRecipe = async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.recipeId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isRecipeSaved = user.saved.some(savedRecipe => savedRecipe.recipe.toString() === recipeId);

    if (!isRecipeSaved) {
      return res.status(400).json({ error: 'Recipe is not saved' });
    }

    user.saved.pull({ recipe: recipeId });

    await user.save();

    return res.status(200).json({ message: 'Recipe removed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const upload_image = async (req, res) => {
  const { image } = req.files;
  const userId = req.user._id;

  if (!image) return res.sendStatus(400);

  const lastIndex = image.name.lastIndexOf(".");
  const extention = image.name.slice(lastIndex + 1);
  const imageName = Date.now() + "." + extention;

  if (extention !== "png" && extention !== "jpg" && extention !== "jpeg") {
    return res.status(400).send({ message: "invalid image format" });
  }

  const { dirname } = require("path");
  const appDir = dirname(require.main.filename);
  const image_dir = appDir + "/public/images/" + imageName;
  image.mv(image_dir);

  await User.findByIdAndUpdate(userId, {
    image: imageName,
  });

  res.status(200).send("Image uploaded");
};

const get_user = async (req, res) => {
  res.send(req.user);
};

const update_image=async(req,res)=>{
  const {image}=req.files;
  const userId=req.user._id;

  if(!image) return res.sendStatus(400);

  const lastIndex = image.name.lastIndexOf(".");
  const extension = image.name.slice(lastIndex + 1);
  const imageName = Date.now() + "." + extension;

  if (extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
    return res.status(400).send({ message: "Invalid image format" });
  }

  const { dirname } = require("path");
  const appDir = dirname(require.main.filename);
  const image_dir = appDir + "/public/images/" + imageName;
  image.mv(image_dir);

  await User.findByIdAndUpdate(userId, {
    image: imageName,
  });

  res.status(200).send("Image updated");

}


const getSavedRecipes = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const savedRecipes = user.saved;

    res.status(200).json({ savedRecipes });
  } catch (error) {
    console.error('Error getting saved recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    await user.save();

    return res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRewards=async(req,res)=>{
  try{
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    if(!user){
      console.log("user not found");
    }
    const Rewards = user.rewards;
    res.status(200).json({ Rewards }); 

  }catch(error){
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });

  }
}

const get_userImage=async(req,res)=>{

  try{
    const userId=req.user._id;
      const user=await User.findById(userId);
      if(!user) res.status(400).json({error:"couldnt find user "})

      const image = user.image || null;
      res.status(200).json({image:image});
  }catch(error){
    console.log(error);
    return res.status(500).json({error:'Internal Server Error'})
  }
}

module.exports = {
    findByIdAndUpdate,
    addReward,
    upload_image,
    get_user,
    get_userImage,
    update_image,
    saveRecipe,
    unsaveRecipe,
    getSavedRecipes,
    editProfile,
    getRewards
};