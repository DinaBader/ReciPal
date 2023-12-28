const User = require("../models/user.model");
const Recipe = require("../models/recipe.model");
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
  const userId = req.params.userId;
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


module.exports = {
    findByIdAndUpdate,
    addReward
};