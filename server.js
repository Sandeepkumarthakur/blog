const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const Article = require('./models/articles')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const d_b = 'mongodb://Sandeep:San@cluster0-shard-00-00.z45op.mongodb.net:27017,cluster0-shard-00-01.z45op.mongodb.net:27017,cluster0-shard-00-02.z45op.mongodb.net:27017/?ssl=true&replicaSet=atlas-105c7r-shard-0&authSource=admin&retryWrites=true&w=majority';
// console.log(process.env.PORT);
mongoose.connect(d_b, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})
app.use('/articles', articleRouter)

let PORT = 5000 || process.env.PORT;
console.log('Env port'+PORT)
app.listen(PORT,()=>{
    console.log(PORT)
})