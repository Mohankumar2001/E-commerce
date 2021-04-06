import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (prouductId) => {
        dispatch(removeFromCart(productId));
    }
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>Shopping cart</h3>
                    <div>Price</div>
                </li>
                <li>
                {
                    cartItems.length === 0 ? <div>Cart is empty</div> : 
                        cartItems.map( item =>
                            <div>
                                <img src={"../" + item.image} alt="product-image" />
                                <div className="cart-name">
                                    <div>{item.name}</div>
                                    <div>
                                        Qty:
                                        <select>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>delete</button>
                                    </div>
                                </div>
                                <div>{item.price}</div>
                            </div>
                        )
                }
                </li>
            </ul>
        </div>
        <div className="cart-actions">
            <h3>
                Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                : $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button className="button primary" disabled={cartItems.length === 0}>Proceed to Checkout</button>

        </div>
        </div>
}

export default CartScreen;