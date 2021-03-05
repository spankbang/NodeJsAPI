const express = require("express");
const routes = express.Router()


routes.get("/", (req, res, next) => {
    res.status(200).json({
        messsag: "Handlling GET requests to orders !"
    })
})

routes.post("/", (req, res, next) => {
    order = {
        productid: req.body.productid,
        quantity : req.body.quantity
    }
    res.status(200).json({
        messsag: "Handlling POST requests to orders !",
        order:order 
    })
})



routes.get("/:orderid", (req, res, next) => {
    const id = req.params.orderid
    res.status(200).json({
        message: "You need a GET order with ID",
        id_ : id
    })
})

routes.put("/:orderid", (req, res, next) => {
    const id = req.params.orderid
    res.status(200).json({
        message: "You need a PUT order with ID",
        id_ : id
    })
})

routes.delete("/:orderid", (req, res, next) => {
    const id = req.params.orderid
    res.status(200).json({
        message: "You need a DELETE order with ID",
        id_ : id
    })
})



module.exports = routes
