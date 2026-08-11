const express = require('express')

const app = express();

app.use((req, res, next) => {
    console.log("Middleware Running")
    next()
})

app.get('/', (req, res) => {
    res.send("Server Created Using ExpressJS")
})

app.get("/test", (req, res) => {
    res.send("this is test rout")
})

app.listen(3000)