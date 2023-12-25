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

module.exports={
    addReview
}