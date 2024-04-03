const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    immat: {
        type: String,
        required: true,
    },

    user_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate:true
    },
    marque: {
        type: String,

    },
    model: {
        type: String,

    },
    fab: {
        type: String,

    },
    kilo: {
        type: String,

    },
    enabled: {
        type: Boolean,
        default: true
    }
    ,
    removed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
Schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Car', Schema);