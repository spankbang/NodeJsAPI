const express = require("express")

const app = express()

const productRoutes = require("./api/routes/products")
const ordersRoutes = require("./api/routes/orders")



// following is the mongo db connection !

const mongoose = require("mongoose")
mongoose.connect(
    "mongodb://localhost:27017/NodeAPI"
)

// above is the mongo db connection !



// just install body parser which parses the URL !
// following are the body-parser one time req
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use("/products", productRoutes)
app.use("/orders", ordersRoutes)

// following is the CORS access !
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept,Authorization')

    /* 
        Browser will always send the OPTIONS request first,
        when you send the POST  or PUT request !
    */
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,PATCH,DELETE,POST,GET")
        return res.status(200).json({
            //emmpty obj
        })
    }
    next()

})
// above are the body-parser one time req


app.use((req,res,next)=>{
    const error = new Error("Not Found !")
    error.status=404
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message : error.message
        }
    })
})

module.exports = app