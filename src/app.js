const express = require('express')
const methodOverride = require('method-override')
const expressSanitizer = require('express-sanitizer')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./api/routes/blogs')

require('dotenv').config()
app = express()

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds211588.mlab.com:11588/restblog`, err => {
    if(err) {
        console.log (`ERROR connecting to DB. ${err}`)
        throw err
    }
    console.log('DB Connected Successfully')
})

app.set('views', 'src/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSanitizer())
app.use(methodOverride('_method'))
app.use('/', routes)

const port = process.env.port || 3000

app.listen(port, process.env.IP, () => {
   console.log(`SERVER IS RUNNING on ${port}`)
})