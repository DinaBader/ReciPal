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

const getReviews=async(req,res)=>{
    try{
        const reviews=Review.find({});
        res.status(200).send({reviews});
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
    addReview,
    removeReview,
    getReviews
}