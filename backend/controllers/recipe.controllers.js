const Recipe=require("../models/recipe.model");
const User=require("../models/user.model");

//when i add a recipe add it to the user
//check if he already has a reward for that country
const addRecipeToUser = async(recipeId,country)=>{
    const users = await User.find({ role: 2 });
    const promises = users.map(async (user) => {
        const completed = user.rewards.some((reward) => reward.country === country);
        const update = {
            $push: {
                finshed_recipes: {
                    recipe: recipeId,
                    completed,
                },
            },
        };
        await User.findByIdAndUpdate(user._id, update);
    });
    
    await Promise.all(promises);
}

const addRecipe = async (req,res)=>{
    const {name,calories,country,total_time,serving,difficulty,categorie,ingredients,instructions}=req.body;
    try{
        const recipe=await Recipe.create({
            name,
            calories,
            country,
            total_time,
            serving,
            difficulty,
            categorie,
            ingredients,
            instructions
        });
        res.status(200).send({recipe});
        await addRecipeToUser(recipe._id,country)
    }catch(error){
        res.status(500).send({
            error:{
                message:"couldnt add recipe",
                details: error.message
            }
        })
    }
};


const deleteRecipeFromUser=async (recipeId)=>{
    const users = await User.find({ role: 2 });

    const promises = users.map(async (user) => {
        const update = {
            $pull: {
                finshed_recipes: {
                    recipe: recipeId,
                },
            },
        };
        await User.findByIdAndUpdate(user._id, update);
    });
    
    await Promise.all(promises);
}

const deleteRecipe=async(req,res)=>{
    const recipeId=req.params.id;
    try{
        const recipe=await Recipe.deleteOne({_id:recipeId});
        if(recipe.deletedCount==0){
            res.status(200).send("couldnt delete recipe");

        }else{
            res.status(500).send("Recipe deleted succsfully");
            await deleteRecipeFromUser(recipeId);

        }
    }catch(error){
        res.status(200).send({
            error:{
                message:"error occured",
                details:error.message
            }
        })
    }
}
const searchRecipes = async (req, res) => {
    const { name } = req.query;

    try {
        const recipes = await Recipe.find({
            $or: [
                { name: { $regex: new RegExp(name, 'i') } },
                { country: { $regex: new RegExp(name, 'i') } }
            ]
        });

        if (recipes.length === 0) {
            res.status(200).send({
                message: "No recipes found",
                recipes: []
            });
        } else {
            res.status(200).send({
                message: "Recipes found",
                recipes
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            error: {
                message: "Error",
                details: error.message
            }
        });
    }
};

  

const addRecipePhoto=async(req,res)=>{
    const {image}=req.files;
    const recipeId=req.params.id;

    if (!image) return res.sendStatus(400);

    const lastIndex = image.name.lastIndexOf(".");
    const extention = image.name.slice(lastIndex + 1);
    const imageName = Date.now() + "." + extention;

    if (extention !== "png" && extention !== "jpg" && extention !== "jpeg") {
        return res.status(400).send({ message: "invalid image format" });
      }
    
      const { dirname } = require("path");
      const appDir = dirname(require.main.filename);
      const image_dir = appDir + "/public/recipes/" + imageName;
      image.mv(image_dir);
  
      await Recipe.findByIdAndUpdate(recipeId, {
        image: imageName,
      });
  
      res.status(200).send("Image uploaded");
}


const getRecipe=async(req,res)=>{
    try{
        const recipes=await Recipe.find({});
        res.status(200).send({recipes});
    }catch(error){
        res.status(400).send({ 
            error: {
                message: 'Error',
                details: error.message, 
            },
        });
    }
}

module.exports={
    addRecipe,
    deleteRecipe,
    searchRecipes,
    addRecipePhoto,
    getRecipe
};