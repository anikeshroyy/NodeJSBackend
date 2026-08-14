const express = require('express')
const ejs = require('ejs')

const path = require('path')

const app = express()
const PORT = 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")


app.get('/', (req, res) => {
    res.render("home")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

app.get('/login', (req, res) => {
    res.render("login")
})




app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})