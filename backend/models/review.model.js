const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    feedback:{
        type:String,
        required:true,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

});


const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;