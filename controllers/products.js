const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ message: 'no products found' });
    }
});

// get product by id
router.get('/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: 'product does not exist' });
    }
});

// add product
router.post('/', async (req, res) => {
    console.log('req', req);
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        tags: req.body.tags,
    });

    try {
        const checkProduct = await Product.findOne({ id: req.body.id });

        if (checkProduct) {
            throw new Error('product exists');
        }

        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.json({ message: 'product not added' });
    }
});

// update product
router.put('/:id', async (req, res) => {
    try {
        let product = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: 'product not edited' });
    }
});

// delete product
router.delete('/:id', async (req, res) => {
    try {
        let deleteProduct = await Product.findByIdAndDelete(req.params.id);
        let id = deleteProduct._id;
        res.status(200).json(id);
    } catch (err) {
        res.status(400).json({ message: 'product not deleted' });
    }
});

module.exports = router;
