const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String },
  owner:{ type: mongoose.Schema.Types.ObjectId,
    ref: 'User'},
  email: { type: String },
  tel: { type: String },
  address: { type: String },

});

module.exports = mongoose.model('Contact', contactSchema);