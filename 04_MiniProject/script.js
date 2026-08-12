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

app.get(`/files/:filename`, (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, fileData) => {
        console.log(fileData);
        res.render("show", { filename: req.params.filename, fileData: fileData })
    })
})

app.get('/edit/:filename', (req, res) => {
    res.render("edit", { filename: req.params.filename })
})

app.post(`/edit`, (req, res) => {
    fs.rename(`./files/${req.body.oldName}`, `./files/${req.body.newName}`, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/')
        }
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