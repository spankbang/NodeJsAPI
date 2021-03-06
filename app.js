var express = require("express")
var app = express()
var productApp = require("./api/routes/product")
var orderApp = require("./api/routes/orders")
var morgan = require("morgan")


const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// mongodb connection
const mongoose = require("mongoose")
mongoose.connect(
    "mongodb://localhost:27017/NodeAPI"
)
// -------------------------------------

app.use("/products", productApp)
app.use("/orders", orderApp)
app.use((req, res, next) => {
    res.status(404).json({
        error : "Page not found."
    })
})
app.use(morgan("dev"))

// CORS connection
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept,Authorization')

    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,PATCH,DELETE,POST,GET")
        return res.status(200).json({
            //emmpty obj
        })
    }
    next()

})
// -------------------------------------



module.exports = app
