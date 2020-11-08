const express = require('express')
const router = express.Router()
const blogCtrl = require('../controllers/blogs')

router.route('/')
.get(blogCtrl.redirectHome)

router.route('/blogs')
.get(blogCtrl.loadPosts)
.post(blogCtrl.createPost)

router.route('/blogs/new')
.get(blogCtrl.addPost)

router.route('/blogs/:id')
.get(blogCtrl.loadPostById)
.put(blogCtrl.updatePost)
.delete(blogCtrl.deletePost)

router.route('/blogs/:id/edit')
.get(blogCtrl.editPost)

module.exports = router