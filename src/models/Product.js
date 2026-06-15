import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'AED',
      trim: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    category: {
      type: String,
      default: 'Cosmetics',
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
