import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
// import data from '../data';

function PaymentScreen(props) {

    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        props.history.push('/placeorder');
    }

    return <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li><h3>Payment</h3></li>
                <li>
                    <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" onChange={(e) => setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="paymentMethod">PayPal</label>
                </li>
                
                <li><button type="submit" className="button">Continue</button></li>
                
            </ul>
        </form>
    </div>
    </div>
}

export default PaymentScreen;