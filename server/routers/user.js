const express = require('express')
const crypt = require('bcryptjs')
const User = require('../db/User')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')

let router = express.Router()

// Init Multer
let upload = multer({
  dest: 'images/avatars/'
})

// Register user
// POST /user/register
router.post('/user/register', async (req, res, next) => {

  try {

    let user = await User.findOne({email: req.body.email})
    if(user) next({ error: 'User already exists!' })

    let newUser = new User(req.body)
    newUser.password = await crypt.hash(newUser.password, 8)
    let token = await newUser.generateToken()
    res.status(201).send({newUser, token})

  } catch(e) { next({ error: 'Wrong email or password!' }) }

})

// Login
// POST /login
router.post('/user/login', async (req, res, next) => {
  
  try {
  
    let user = await User.findUserByCreds(req.body.email, req.body.password)
    if(!user) next({ message: 'Wrong email or password!' })
    let token = await user.generateToken()
    res.send({user, token})

  } catch(e) { next({ error: 'Wrong email or password!' }) }

})

// Get current user
// POST 
router.post('/user/me', async (req, res, next) => {

  try {
    let decoded = jwt.verify(req.body.token, process.env.SECRET)
    let user = await User.findById(decoded.id)
    if(!user) {
      res.send(null)
      return next({ error: 'You are not authinticated!' })
    }
  
    res.send(user)

  } catch(e) { next(e) }
  
})

// Upload avatar
// Patch /user/me/avatar 
router.patch('/user/me/avatar/:id', upload.single('avatar'), async (req, res, next) => {

  try {

    let user = await User.findById(req.params.id)
    if(user.avatar) {
      fs.unlink(user.avatar.path, async () =>{
        user.avatar = req.file
        await user.save()
        res.send(user)
      })
    } else {      
      user.avatar = req.file
      await user.save()
      res.send(user)
    }

  } catch(e) { next(e) }
  
}) 

// Logout user
// patch /user/logout
router.patch('/user/me/avatar/:id', upload.single('avatar'), async (req, res, next) => {

  try {

    let user = await User.findById(req.params.id)
    user.avatar = req.file
    await user.save()
    res.send(user)

  } catch(e) { next(e) }
  
}) 

module.exports = router