import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      default: 'Client',
      trim: true
    },
    quote: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    }
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
