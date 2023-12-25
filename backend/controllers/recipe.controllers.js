const Recipe=require("../models/recipe.model");

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

    }catch(error){
        res.status(500).send({
            error:{
                message:"couldnt add recipe",
                details: error.message
            }
        })
    }
};

module.exports={
    addRecipe
};