const Review = require("../models/review.model");

const addReview=async(req,res)=>{
    const {feedback}=req.body;
    try{
        const review=await Review.create({
            feedback,
        });
        res.status(200).send({review});
    }catch(error){
       res.status(500).send({
        error:{
            message:'error',
            details:error.message,
        },
       });
    }
};

const removeReview=async(req,res)=>{
    const reviewId=req.params.id;

    try{
        const result=await Review.deleteOne({_is:reviewId});
        if(result.deletedCount==0){
            res.status(400).send("review not found");
        }
        res.status(200).send("review deleted successfully");
    }catch(error){
        res.status(500).send({error});
    }
};

module.exports={
    addReview,
    removeReview
}