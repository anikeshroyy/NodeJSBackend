const cookie = require('cookie')
const cookieParser = require('cookie-parser')

const bcrypt = require('bcrypt')

const express = require('express')
const app = express()

app.use(cookieParser())

const PORT = 3000;

const saltRounds = 10;
const plainPassword = "anikeshRoy";


// ---------------Cookie Settting---------------------
app.get('/', (req, res) => {
    res.cookie("name", "hii")
    res.send("Hii From Server")
})

// ---------------Password Hashing---------------------
app.get('/hashpassword', (req, res) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
        const hashPass = hash
        console.log("hash: ", hashPass);
    })

    res.send("password hashing completed")
})

// ---------------Pssword Compare---------------------
app.get('/comparepassword', (req, res) => {
    bcrypt.compare(plainPassword, "$2b$10$CAqpQM4SQ2dYXlyplTEFy.uFsoW.IcC/lpBl6ZGd2AQrgCXPtohY.", (err, result) => {
        console.log(result);
    })
    res.send("Password Comparison Completed")
})


app.get('/test', (req, res) => {
    console.log(req.cookies);
    res.send("Hello From Server")
})


app.listen(PORT, () => {
    console.log("Server Started");
})