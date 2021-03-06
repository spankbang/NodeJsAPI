var express = require("express")
var router = express.Router()
var Product = require("../modules/products")
var mongoose = require("mongoose")


// single end points

router.get("/", (req, res, next) => {
    Product.find().select("_id name price")
        .exec()
        .then((result) => {

            if (result.length>0) {
                res.status(200).json({
                    products: result.map((resu) => {
                        return {
                            _id: resu._id,
                            name: resu.name,
                            price: resu.price,
                            urllink: {
                                method: "GET",
                                url: "http://127.0.0.1:3000/products/" + resu._id
                            }
                        }
                    })
                })
            } else {
                res.status(200).json({
                    msg:"Could not found any document."
                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then((result) => {
            res.status(200).json({
                msg: "Product successfully added !",
                product: result
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


// ------------------------------------------


// double end points

router.get("/:productid", (req, res, next) => {
    const id = req.params.productid
    Product.find({
            _id: id
        }).select("_id name price")
        .exec()
        .then((result) => {
            res.status(200).json({
                products: result.map((resu) => {
                    return {
                        _id: resu._id,
                        name: resu.name,
                        price: resu.price,
                        urllink: {
                            method: "GET",
                            url: "http://127.0.0.1:3000/products/" + resu._id
                        }
                    }
                })
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
})





router.patch("/:productid", (req, res, next) => {
    const id = req.params.productid
    console.log(req.body)
    const updateops = {}
    for (const ops of req.body) {
        updateops[ops.propName] = ops.value
    }
    console.log(updateops)
    Product.updateOne({
            _id: id
        }, {
            $set: updateops
        }).exec()
        .then((result) => {
            res.status(200).json({
                msg: "Product updated successfully !"
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
        

})





router.delete("/:productid", (req, res, next) => {
    const id = req.params.productid
    Product.remove({
        _id: id
    }).exec().then((result) => {
        res.status(200).json({
            msg: "Product deleted successfully !",
            id: id
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})
// ------------------------------------------

module.exports = router