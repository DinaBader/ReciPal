const Recipe=require("../models/recipe.model");
const User=require("../models/user.model");

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

const totalSavedRecipes = async (req, res) => {
    try {
      const result = await User.aggregate([
        {
          $unwind: '$saved',
        },
        {
          $group: {
            _id: null,
            totalSavedRecipes: { $sum: 1 },
          },
        },
      ]);
  
      const { totalSavedRecipes } = result[0];
  
      res.status(200).json({ totalSavedRecipes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports={
    numberOfUsers,
    numberOfRecipes,
    totalSavedRecipes
}