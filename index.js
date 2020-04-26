const express = require('express')
const bodyParser = require('body-parser') 
const {Pool} = require('pg')
const bcrypt = require('bcrypt')

const {addStudent,addStudentDetails,getStudent, getStudentByEmail} = require('./utils/queries')


const app = express()
const ejs = require('ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const db = new Pool({
    user: "hrushi",
    password: "hrushi",
    host: "localhost",
    port: 5432,
    database: 'messManagement'
})

app.get('/', async (req, res) => {
  await db.query(getStudentInfo())
    res.render('home')
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signUp', (req, res) => {
    res.render('sign_up')
})



app.post('/login',async (req, res) => {
    var student = {
        email: req.body.email,
        password:req.body.password
    }
    try {     
    let result = await db.query(getStudentByEmail(student.email))
    bcrypt.compare(student.password, result.rows[0].password).then((result) => {
        goToHome(res)
    })
    } catch (error) {
        console.log('error', error)  
    }
})


app.post('/signUp', async function(req, res)  {
    var student = {
        email: req.body.email, 
        name:req.body.name,
        password:await bcrypt.hash(req.body.password, 10),
        department:req.body.department,
        year:req.body.year,
        registration_id: req.body.registration_id,
        mobile_no: req.body.mobile_no,
        father_mobile_no: req.body.father_mobile_no,
        mess_name: 'C Mess',
        mess_id: 1
    }
    try {

        let response = await db.query(addStudent(student))
        console.log(response.rows)
    let result =  await db.query(addStudentDetails(student,response.rows[0].id))
    console.log(response.rows)
    res.redirect('/')
    } catch (error) {
        console.log('error', error)
    }
  


})


app.listen(9000, () => console.log('Server started on port 9000'))


const goToHome =async (res) => {
db.query
}