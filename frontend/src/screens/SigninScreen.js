import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import { signin } from '../actions/userActions';
// import data from '../data';

function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();

    useEffect(() => {
        if(userInfo) {
            props.history.push("/");
        }
        return () => {
            //
        };
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li><h3>Sign In</h3></li>
                <li>
                    {loading && <div>loading...</div>}
                    {error && <div>{error.message}</div>}
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li><button type="submit" className="button">Sign In</button></li>
                <li>New to NITTEShop?</li>
                <li><Link to="/register" className="button">Sign up</Link></li>
            </ul>
        </form>
    </div>
}

export default SigninScreen;