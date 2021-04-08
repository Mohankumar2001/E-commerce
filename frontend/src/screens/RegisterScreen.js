import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import { register } from '../actions/userActions';
// import data from '../data';

function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userRegister = useSelector(state=>state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        };
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password === confirmPassword)
        {
            dispatch(register(name, email, password));
        }
        else {
            alert("confirm password does not match");
        }
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li><h3>Sign Up</h3></li>
                <li>
                    {loading && <div>loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">name</label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </li>
                <li><button type="submit" className="button">Sign Up</button></li>
                <li>Already have an account?<Link to={redirect === "/"? "signin":"signin?redirect="+redirect} className="button">Sign In</Link></li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;