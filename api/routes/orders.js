var express = require("express")
var mongoose = require("mongoose")
const Order = require("../modules/order")
const Product = require("../modules/products")




const {
    route
} = require("./product")
var router = express.Router()



// single end points

router.get("/", (req, res, next) => {
    Order.find().select("_id product quantity").exec()
        .then(docs => {
            if (docs.length > 0) {
                res.status(200).json({
                    count: docs.length,
                    docs: docs.map((doc) => {
                        return {
                            doc: doc,
                            type: "GET",
                            url: "http://127.0.0.1:3000/orders/" + doc._id
                        }
                    }),

                })
            } else {
                res.status(404).json({
                    msg: "No documents"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})


router.post("/", (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            console.log(product)
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            res.status(201).json({
                message: "Order stored",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// ------------------------------------------


// double end points

router.get("/:orderid", (req, res, next) => {
    const id = req.params.orderid
    Order.find({
        _id: id
    }).then((result) => {
        res.status(200).json({
            doc: result
        })
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
    Order.remove({
            _id: id
        }).exec()
        .then((result) => {
            res.status(200).json({
                msg: id + " removed successfully."
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        })
})


// ------------------------------------------

module.exports = router