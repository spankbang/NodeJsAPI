var express = require("express")
const {
    route
} = require("./product")
var router = express.Router()



// single end points

router.get("/", (req, res, next) => {
    res.status(200).json({
        msg: "orders GET"
    })
})


router.post("/", (req, res, next) => {
    const order = {
        productid: req.body.productid,
        quantity : req.body.quantity
    }
    res.status(200).json({
        msg: "orders POST",
        order:order
    })
})

// ------------------------------------------


// double end points

router.get("/:orderid", (req, res, next) => {
    const id = req.params.orderid
    res.status(200).json({
        msg: "orders GET",
        id: id

    })
})

router.patch("/:orderid", (req, res, next) => {
    const id = req.params.orderid
    res.status(200).json({
        msg: "orders PATCH",
        id: id

    })
})

router.delete("/:orderid", (req, res, next) => {
    const id = req.params.orderid
    res.status(200).json({
        msg: "orders DELETE",
        id: id

    })
})


// ------------------------------------------

module.exports = router