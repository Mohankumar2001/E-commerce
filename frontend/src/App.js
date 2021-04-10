import React from 'react';
// import data from './data';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
          <header className="header row">
              <div className="brand">
                  <button onClick={openMenu}>
                      &#9776;
                  </button>
                  <Link to="/" > NITT E Shop </Link>
                  {/* <a href="index.html"> NITT E Shop </a> */}
              </div>
              <div className="header-links">
                  <div>
                  {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
                    <Link className="cart-symbol" to="/cart"> &#x1F6D2; 
                   </Link></div>
                  { userInfo ? <div className="dropdown"><Link to="#"> {userInfo.name} </Link>{' '}
                    <ul className="dropdown-content">
                    <li> <Link to="/profile">Profile</Link></li> 
                    <li> <Link to="/orderhistory">Orders</Link></li> 
                    <li><Link to="/" onClick={signoutHandler}>Log out</Link></li>

                    </ul>
                    </div>
                  : <div><Link to="/signin"> sign in </Link></div>}
                  
              </div>
          </header>
          <aside className="sidebar">
              <h3>Categories</h3>
              <button className="sidebar-close-button" onClick={closeMenu}>x</button>
              <ul>
                  <li><a href="index.html">Dimora</a></li>
                  <li><a href="index.html">2k</a></li>
              </ul>
          </aside>
          <main className="main">
              <div className="content">
                <Route path="/products" component={ ProductsScreen } />
                <Route path="/shipping" component={ ShippingScreen } />
                <Route path="/payment" component={ PaymentScreen } />
                <Route path="/placeorder" component={ PlaceOrderScreen } />
                <Route path="/signin" component={ SigninScreen } />
                <Route path="/profile" component={ ProfileScreen } />
                <Route path="/register" component={ RegisterScreen } />
                <Route path="/orderhistory" component={ OrderHistoryScreen } />
                <Route path="/order/:id" component={ OrderScreen } />
                <Route path="/product/:id" component={ ProductScreen } />
                <Route path="/cart/:id?" component={ CartScreen } />
                <Route path="/" exact={true} component={ HomeScreen } />
              </div>
          </main>
          <footer className="footer">
              All rights reserved.
          </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
