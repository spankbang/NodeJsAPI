const express = require("express");
const routes = express.Router()


routes.get("/", (req, res, next) => {
    res.status(200).json({
        messsag: "Handlling GET requests to proucts !"
    })
})

routes.post("/", (req, res, next) => {
    res.status(200).json({
        messsag: "Handlling POST requests to proucts !"
    })
})



routes.get("/:productid", (req, res, next) => {
    const id = req.params.productid
    res.status(200).json({
        message: "You need a GET product with ID",
        id_: id
    })
})

routes.put("/:productid", (req, res, next) => {
    const id = req.params.productid
    res.status(200).json({
        message: "You need a PUT product with ID",
        id_: id
    })
})

routes.delete("/:productid", (req, res, next) => {
    const id = req.params.productid
    res.status(200).json({
        message: "You need a DELETE product with ID",
        id_: id
    })
})



module.exports = routes