const Recipe=require("../models/recipe.model");
const Users=require("../models/user.model");

const numberOfUsers = async(req,res)=>{
    try{
        const numofUsers=await Users.find().count();
        res.status(200).json({numofUsers})
    }catch(error){
        res.status(500).json({"error":error});
    }
}

const numberOfRecipes = async(req,res)=>{
    try{
        const numofRecipes=await Recipe.find().count();
        res.status(200).json({numofRecipes})
    }catch(error){
        res.status(500).json({"error":error});
    }
}

module.exports={
    numberOfUsers,
    numofRecipes
}