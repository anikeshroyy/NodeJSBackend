const express = require('express')
const path = require('path')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "/public")))


app.get('/', (req, res) => {
    res.render("index")
})

app.listen(3000, () => {
    console.log("Server started on", 3000);
})