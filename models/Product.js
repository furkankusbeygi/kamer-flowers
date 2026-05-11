import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String },
  status: { type: String, default: 'Aktif' },
  imageUrl: { type: String } // İleride fotoğraf yüklemek için
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);