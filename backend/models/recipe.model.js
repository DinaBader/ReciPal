const mongoose =require("mongoose");

const recipeSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    calories:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    total_time:{
        type:String,
        required:true,
    },
    serving:{
        type:Number,
        required:true,
    },
    difficulty:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    categorie:{
        type:String,
    },
    image:{
        type:String,
        default:"",
    },
    icon:{
        type:String,
        default:"",
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