const express = require('express')
const path = require('path')
const fs = require('node:fs');
const { log } = require('node:console');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "/public")))


app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        console.log(files);
        res.render("index", { files: files })
    })
})

app.post('/create', (req, res) => {
    const title = req.body.title;
    const description = req.body.description

    const filename = `${title.split(" ").join("")}.txt`

    fs.writeFile(`./files/${filename}`, description, (err) => {

        if (err) console.log(err)

        res.redirect("/")
    })
    console.log(req.body);

})

app.listen(3000, () => {
    console.log("Server started on", 3000);
})