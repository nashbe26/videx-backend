const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  }],
  id_prod:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;  