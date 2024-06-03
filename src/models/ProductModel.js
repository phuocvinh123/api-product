import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    username: { type: String, default: 'username' },
    isCertificated: { type: Boolean, default: false },
    saved: { type: Boolean, default: false },
    category: { type: String, default: '' },
    likedCount: { type: Number, default: 10 },
    price: { type: Number, default: 10000 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
