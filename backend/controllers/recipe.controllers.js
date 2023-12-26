const Recipe=require("../models/recipe.model");
const User=require("../models/user.model");
  
//when i add a recipe add it to the user
//check if he already has a reward for that country
const addRecipeToUser = async(recipeId,country)=>{
    const users = await User.find({ role: 1 });
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

const deleteRecipe=async(req,res)=>{
    const recipeId=req.params.id;
    try{
        const recipe=await Recipe.deleteOne({_id:recipeId});
        if(recipe.deletedCount==0){
            res.status(200).send("couldnt delete recipe");
        }else{
            res.status(500).send("Recipe deleted succsfully");
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

module.exports={
    addRecipe,
    deleteRecipe
};