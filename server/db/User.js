const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crypt = require('bcryptjs')

let UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: Object,
    default: null
  },

  tokens: [{
    token: { type: String }
  }]

}, { timestamps: true })

// Set rel with image model
UserSchema.virtual('images', {
  ref: "Image",
  localField: "_id",
  foreignField: "user"
})

// Set the user value to return
UserSchema.methods.toJSON = function() {

  let user = this.toObject()

  delete user.password
  delete user.email
  delete user.tokens

  return user

}

// Find By Credintials Method
UserSchema.statics.findUserByCreds = async (email, password) => {

  let user = await User.findOne({ email })
  if(!user) throw new Error("Wrong email!")

  let isMatch = await crypt.compare(password, user.password)
  if(!isMatch) throw new Error("Wrong password!")

  return user

}

// Set Token Generator method
UserSchema.methods.generateToken = async function() {

  let token = jwt.sign({id: this._id.toString()}, process.env.SECRET)
  this.tokens = this.tokens.concat({ token })
  await this.save()
  return token

}

const User = mongoose.model('User', UserSchema)

module.exports = User