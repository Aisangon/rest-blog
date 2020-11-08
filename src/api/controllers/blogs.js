const Blog = require('../../models/blog')

function redirectHome(req, res) {
    res.redirect('/blogs')
}

function loadPosts(req, res) {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log('Error!')
        } else {
            res.render('index', {blogs: blogs})
        }
    })
}

function addPost(req, res) {
    res.render('new')
}

function createPost(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err){
            res.render('new')
        } else {
            res.redirect('/blogs')
        }
    })
}

function loadPostById(req, res) {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            res.redirect('/blogs')
        } else {
            res.render('show', {blog: foundBlog})
        }
    })
}

function editPost(req, res) {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
           res.redirect('/blogs')
        } else {
            res.render('edit', {blog: foundBlog})
        }
    })
}

function updatePost(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            res.redirect('/blogs')
        } else {
            res.redirect('/blogs/' + req.params.id)
        }
    })
}

function deletePost(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        res.redirect('/blogs')
    })
}

module.exports = {
    redirectHome,
    loadPosts,
    addPost,
    createPost,
    loadPostById,
    editPost,
    updatePost,
    deletePost
}