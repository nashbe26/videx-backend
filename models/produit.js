const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  statusProd:{
    type: String,
      enum: ['en arrivage','en stock','épuisé'],
      default: 'en stock',
    
  }
,
  categories:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  sub_categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  },
  quantity: {
    type: Number,
    min: 0
  },
  is_balance: {
    type: Boolean,
    default:false
  },
  max_quantity:{
    type: Number
  },
  max_weight:{
    type: Number
  },
  weight: {
    type: String,
  },
  photos: {
    type: [String],
  },
  description:{
    type:String
  }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
