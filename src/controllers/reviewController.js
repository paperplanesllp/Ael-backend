import Review from '../models/Review.js';

export async function getReviews(req, res, next) {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

export async function createReview(req, res, next) {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
}
