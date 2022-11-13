const jwt = require('jsonwebtoken')
const User = require('../models/user')

let auth = async (req, res, next) => {

  try {

    let token = req.header('Authorization').replace('Bearer ', '')
    console.log(token, process.env.SECRET)
    let decoded = jwt.verify(token, process.env.SECRET)
    let user = await User.findOne({_id: decoded._id, 'tokens.token': token})


    if(!user) throw new Error()

    req.token = token
    req.user = user
    next()
 
  } catch { res.status(400).send({error: 'Please authinticate.'}) }

}

module.exports = auth