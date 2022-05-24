require('dotenv').config()
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use('/static', express.static('static'))
app.use(express.urlencoded({extended: false}))

//Nodemailer Setup
const mailuser = process.env.MAILID
const client = require('./config/mailer')

app.get('/', (req,res) => {
    res.render('index')
})

app.post('/', (req,res) => {
    const sendEmail = {
        from: mailuser,
        to: process.env.MAILID,
        subject: `Email from ${req.body.email}`,
        text: req.body.message
    }

    client.sendMail(sendEmail, (err, info) => {
        if(err) {
            console.log(err)
            res.redirect('/')
        } else {
            console.log('Success')
            res.redirect('/')
        }
    })
})

app.get('*', function(req, res){
    res.render('error')
  })

const PORT = 8080


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})