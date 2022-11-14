// 4.create express-handle-bars to create a dynamic web application
// 5.display a visual error message using render method
// 6.create a nodemailer to send an email to successful registerd users
//install node mailer*/ 

require('dotenv').config()

const express = require('express')
const app = express()
const port = 5000
const connectDB = require('./db/connect')
const router = require('./routes/auth')
const {engine} = require('express-handlebars')
const path = require('path')
// app.use(express.static('public'))
app.use('/public',express.static(path.join(__dirname,'public')))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', router)

const start = async () => {
    try {
       await connectDB(process.env.MONGO_URI)
       app.listen(port, () => console.log(`Server is listening on port ${port}`)) 
    } catch (error) {
        console.log(error)
    }
}

start()