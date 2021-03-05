const express = require("express");
const routes = express.Router()

const Product = require("../models/product")
const mongoose = require("mongoose");
const {
    update
} = require("../models/product");

routes.get("/", (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs)
            if (docs.length > 0) {
                res.status(200).json(docs)
            } else {
                res.status(404).json({
                    message: "Could not found any doc !"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                erro: err
            })
        })

})

routes.post("/", (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    })
    product.save().then((result) => {
        console.log("fuck:" + result)
        res.status(200).json({
            messsag: "Handlling POST requests to proucts !",
            createProduct: result
        })
    }).catch(err => {
        console.log(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    })

})



routes.get("/:productid", (req, res, next) => {
    const id = req.params.productid
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({
                    message: "No valid entry found !"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

})

routes.patch("/:productid", (req, res, next) => {
    const id = req.params.productid
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.updateOne({
        _id: id
    }, {
        $set: updateOps
    }).exec().then(result => {
        console.log(result)
        res.status(200).json({
            result
        }).catch(err =>{
            res.status(200).json({
                error : err
            })
        })
    })
})

routes.delete("/:productid", (req, res, next) => {
    const id = req.params.productid
    Product.remove({
        _id: id
    }).exec().then(
        result => {
            res.status(200).json(result)
        }
    ).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})



module.exports = routes