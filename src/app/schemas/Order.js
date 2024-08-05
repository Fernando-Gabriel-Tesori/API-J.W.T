import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId, // Tipo correto para referência a outro documento
      ref: 'User', // Certifique-se de que a referência está correta
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId se referenciar outro documento
        ref: 'Product', // Certifique-se de que a referência está correta
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number, 
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Order', OrderSchema);
