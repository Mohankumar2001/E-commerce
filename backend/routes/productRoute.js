import express from 'express';
import Product from '../models/productModel.js';
import { getToken } from '../util.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: "Product not found"});
    }
    res.send(product);
});



router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
    });
    const newProduct = await product.save();
    if(newProduct) {
        res.status(201).send({message: 'New Product created', data: newProduct});
    }
    return res.status(500).send({message: 'Error in Creating Product'});
});

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id: productId});
    if(product) {
            product.name =  req.body.name;
            product.price =  req.body.price;
            product.image =  req.body.image;
            product.brand =  req.body.brand;
            product.category =  req.body.category;
            product.countInStock =  req.body.countInStock;
            product.description =  req.body.description;
            const updatedProduct = await product.save();
        if(updatedProduct) {
            res.status(201).send({message: 'Product Updated', data: updatedProduct});
        }
    }
    
    return res.status(500).send({message: 'Error in Updating Product'});
});

router.delete('/:id', async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct) {
        await deletedProduct.remove();
        res.send({message: "Product Deleted"});
    } 
    else {
    res.send("Error in deletion");
    }
})

export default router;