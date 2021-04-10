import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';

export default function ProfileScreen() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(detailsUser(userInfo._id));
    }, [dispatch, userInfo._id]);
    const submitHandler = (e) => {
        e.preventDefault();
    };
    return (
        <div className="content content-margined">

        <div className="product-header">
            <h3>User Profile </h3>
        </div>

        { loading ? <div>loading....</div> 
        : error ? <div>{error}</div>
        : (<>
            <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li><h3>Create Product </h3></li>

                <li>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="enter name" value={user.data.name} id="name">{user.name}</input>
                </li>
                <li>
                    <label htmlFor="email">E mail</label>
                    <input type="email" placeholder="enter email" value={user.data.email} id="email_"></input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="enter password" name="password" id="password"></input>
                </li>
                <li>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" placeholder="Re enter password" id="confirmPassword"></input>
                </li>
                <li><button type="submit" className="button">Update</button></li>
            </ul>
        </form>
        </div>
        </>)}
    </div>);
    

}