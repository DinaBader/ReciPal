const Review = require("../models/review.model");

const addReview = async (req, res) => {
    const { feedback } = req.body;
    if (feedback === "") {
        return res.status(400).send({ error: { message: "Review cannot be empty" } });
    }

    try {
        const review = await Review.create({ feedback });
        return res.status(200).send({ review });
    } catch (error) {
        return res.status(500).send({ error: { message: 'Error', details: error.message } });
    }
};

const removeReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const result = await Review.deleteOne({ _id: reviewId });
    if (result.deletedCount == 0) {
      res.status(400).send("review not found");
    }
    res.status(200).send("review deleted successfully");
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).send({ reviews });
  } catch (error) {
    res.status(400).send({
      error: {
        message: "Error",
        details: error.message,
      },
    });
  }
};

module.exports = {
  addReview,
  removeReview,
  getReviews,
};
