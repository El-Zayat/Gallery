const mongoose = require('mongoose')

let ImageSchema = new mongoose.Schema({

  path: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  likes: [{
    user: { 
      type: mongoose.Schema.Types.ObjectId
    }
  }]

}, { timestamps: true })

module.exports = mongoose.model('Image', ImageSchema)