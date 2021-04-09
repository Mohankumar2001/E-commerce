import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { createOrder, detailsOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import {PayPalButton} from 'react-paypal-button-v2';

function OrderScreen(props) {

    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const {data} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if(!order) {
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if(!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady]);

    const successPaymentHandler = () => {};
    return loading ? <div>Loading....</div> : error ? <div>{error}</div>
    : <div>
            <h1>Order: {order._id}</h1>
        <div className="placeOrder">
        <div className="placeOrder-info">
            <div><div><h3>Shipping</h3></div>
            <div>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</div>
                {order.isDelivered?<div>Delivered...</div>:<div>Not Delivered...</div>}
            </div>
            <div><div><h3>Payment</h3></div>
            <div>Payment Method: {order.paymentMethod}</div>
                {order.isPaid?<div>Paid...</div>:<div>Not Paid...</div>}
            </div>
            <div>
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping cart</h3>
                    <div>Price</div>
                </li>
                <li>
                {
                    order.orderItems.length === 0 ? <div>Cart is empty</div> : 
                        order.orderItems.map( item =>
                            <div className="cart-List-Item">
                                <div className="cart-image"><img src={item.image} alt="product-image" /></div>
                                
                                <div className="cart-name">
                                    <div><Link to={"/product/" + item.product}>{item.name}</Link></div>
                                    <div>
                                        Qty: {item.qty}
                                    </div>
                                </div>
                                <div className="cart-price">${item.price}</div>
                            </div>
                        )
                }
                </li>
            </ul>
            </div>
            
        </div>
        <div className="placeOrder-actions">
            <ul>
                <li><h3>Order Summary</h3></li>
                <li><div>Items:</div><div>${order.itemsPrice}</div></li>
                <li><div>Shipping:</div><div>${order.shippingPrice}</div></li>
                <li><div>Tax:</div><div>${order.taxPrice.toFixed(2)}</div></li>
                <li><div>Total:</div><div>${order.totalPrice}</div></li>
                {
                    !order.isPaid && (
                        <li>
                            {!sdkReady? (<div>Loading...</div>):
                                (<PayPalButton className="paypalButton" amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>)
                            }
                        </li>
                    )
                }
            </ul>

        </div>
        </div>
        </div>
}

export default OrderScreen;