const express = require("express")
// importing the express package

const app = express()
// creating the express object



// use() is a middleware, so that every request will come here
app.use((req, res,next) => {
    res.status(200).json({
        message : "It works !"
    })
})


module.exports = app