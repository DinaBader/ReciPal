const mongoose =require("mongoose");

const recipeSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    recipe_calories:{
        type:Number,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    prep_time:{
        type:Number,
        required:true,
    },
    cook_time:{
        type:number,
        required:true,
    },
    image:{
        type:String,
    },
    categories:{
        type:String,
    },
    ingredients:[{
        type:String,
        required:true,
    }],
    instructions:[{
        type:String,
        required:true,
    }],
}) 

const Recipe=mongoose.model("Recipe",recipeSchema);
module.exports=Recipe;