import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems, shipping, payment} = cart;
    if(!shipping.address) {
        props.history.push("/shipping");
    } else if(!payment) {
        props.history.push("/payment");
    }
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 50? 1 : 12;
    const taxPrice = 0.13 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {}

    const dispatch = useDispatch();
    useEffect(() => {
    }, []);

    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeOrder">
        <div className="placeOrder-info">
            <div><div><h3>Shipping</h3></div>
            <div>{cart.shipping.address}, {cart.shipping.city}, {cart.shipping.postalCode}, {cart.shipping.country}</div></div>
            <div><div><h3>Payment</h3></div>
            <div>Payment Method: {cart.payment.paymentMethod}</div></div>
            <div>
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping cart</h3>
                    <div>Price</div>
                </li>
                <li>
                {
                    cartItems.length === 0 ? <div>Cart is empty</div> : 
                        cartItems.map( item =>
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
                <li><button className="button primary" onClick={placeOrderHandler}>Place Order</button></li>
                <li><h3>Order Summary</h3></li>
                <li><div>Items:</div><div>${itemsPrice}</div></li>
                <li><div>Shipping:</div><div>${shippingPrice}</div></li>
                <li><div>Tax:</div><div>${taxPrice}</div></li>
                <li><div>Total:</div><div>${totalPrice}</div></li>
            </ul>

        </div>
        </div>
        </div>
}

export default PlaceOrderScreen;