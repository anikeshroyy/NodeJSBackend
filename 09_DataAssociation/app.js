const express = require('express')


const userModel = require('./models/user')
const postModel = require('./models/post')


const app = express()
const PORT = 3000;


app.get('/', (req, res) => {
    res.send("Hello From Server")
})

app.get('/create/user', async (req, res) => {
    let createdUser = await userModel.create({
        username: "anikesh1234",
        email: "ani@gmail.com",
        age: 26,
    })
    res.send(createdUser)
})

app.get('/create/post', async (req, res) => {
    let post = await postModel.create({
        user: "6a7e6df6d3de56632fcdcc30",
        postdata: "this is post data of abcd_post"
    })

    let user = await userModel.findOne({ _id: "6a7e6df6d3de56632fcdcc30" })
    user.post.push(post._id)
    await user.save()
    res.send(user, post)
})


app.listen(PORT, () => {
    console.log("Server is running...");
})