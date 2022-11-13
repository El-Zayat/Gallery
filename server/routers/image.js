const express = require('express')
const multer = require('multer')
const Image = require('../db/Image')
const User = require('../db/User')
const fs = require('fs')

// Init Multer
let upload = multer({
  fileFilter(req, file, cb) {

    if(!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) cb({error: "File must be an image"})
    cb(undefined, true)

  },
  dest: 'images/gallery/',
})

let router = express.Router()

// Add an image
// POST /images
router.post('/images/:id', upload.single('image'), async (req, res, next) => {

  try {

    let imageDoc = new Image(req.file)
    imageDoc.user = req.params.id
    await imageDoc.save()
    res.send(imageDoc)

  } catch(e) { next({ error: 'Something went wrong!' }) }

})

// Get all images
// GET /images
router.get('/images', async (req, res) => {

  try {

    let images = await Image.find({}).sort({'createdAt': 'desc'})
    res.send(images)

  } catch(e) { res.status(404).send(e.message) }

})

// Get currentUser images
// GET /user/:id/images
router.get('/user/:id/images', async (req, res, next) => {

  try {

    let images = await Image.find({ user: req.params.id })
    res.send(images)

  } catch(e) { next(e) }

})

// Add a like to the image
// POST /image/:id/like/:userId
router.post('/image/:id/like/:userId', async (req, res, next) => {

  let image = await Image.findById(req.params.id)

  try {

    // console.log(image.likes[0].like, req.params.userId)
    
    console.log(image.likes.every(like => like.user != req.params.userId))

    if(image.likes.every(like => like.user != req.params.userId)) {

      image.likes = image.likes.concat({ user: req.params.userId })
      await image.save()
      res.send(image)

    } else {

      image.likes = image.likes.filter(like => like.user != req.params.userId)
      await image.save()
      res.send('You already liked it!')

    }
    
  } catch(e) { next(e) }

})

// Delete an image 
// DELETE /user/:userId/image/:imageId
router.delete('/user/image/:imageId', async(req, res, next) => {

  try {

    let image = await Image.findById(req.params.imageId)
    console.log(image, req.params.imageId)
    fs.unlink(image.path, async() => {
      await image.delete()
      res.send('done')
    })

  } catch(e) { next(e) }

})

module.exports = router