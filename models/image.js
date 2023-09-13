const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl_1: {
    type: String,
    
  },
  imageUrl_2: {
    type: String,
    
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;