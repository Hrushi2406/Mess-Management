const express = require('express')
const bodyParser = require('body-parser') 


const app = express()
const ejs = require('ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));



app.get('/', (req, res) => {
    res.render('home')
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signUp', (req, res) => {
    res.render('sign_up')
})



app.listen(9000, () => console.log('Server started on port 9000'))