import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems, shipping, payment} = cart;
    if(!shipping.address) {
        props.history.push("/shipping");
    } else if(!payment) {
        props.history.push("/payment");
    }
    cart.itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    cart.shippingPrice = cart.itemsPrice > 50? 1 : 12;
    cart.taxPrice = 0.13 * cart.itemsPrice;
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, loading, error, success } = orderCreate;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [dispatch, order, props.history, success]);

    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeOrder">
        <div className="placeOrder-info">
            <div><div><h3>Shipping</h3></div>
            <div>{cart.shipping.address}, {cart.shipping.city}, {cart.shipping.postalCode}, {cart.shipping.country}</div></div>
            <div><div><h3>Payment</h3></div>
            <div>Payment Method: {cart.payment}</div></div>
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
                <li><div>Items:</div><div>${cart.itemsPrice}</div></li>
                <li><div>Shipping:</div><div>${cart.shippingPrice}</div></li>
                <li><div>Tax:</div><div>${cart.taxPrice.toFixed(2)}</div></li>
                <li><div>Total:</div><div>${cart.totalPrice}</div></li>
                {loading && <div>Loading...</div>}
                {error && <div>error...</div>}
            </ul>

        </div>
        </div>
        </div>
}

export default PlaceOrderScreen;