import express, { response } from 'express';
import Order from '../models/orderModel';
import { isAuth } from '../util';
const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, async (req, res) => {
    console.log("step 1");
    const orders = await Order.find({user: req.user._id});
    console.log("step2");
    if(orders) {
        res.send(orders);
    }
    else {
        res.send("Error......");
    }
});

orderRouter.post('/', isAuth,  async (req, res) => {
    
    if(req.body.orderItems.length === 0) {
        res.status(400).send({message: 'Cart is empty!!'});
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shipping,
            paymentMethod: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        
        const createdOrder = await order.save();
        return res.status(201).send({message: 'New order is Created', order: createdOrder});
    }
});

orderRouter.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order not found'});
    }
});

orderRouter.put('/:id/pay', isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = { 
            id: req.body.id, 
            status: req.body.status, 
            update_time: req.body.update_time, 
            email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order not found'});
    }
});


export default orderRouter;