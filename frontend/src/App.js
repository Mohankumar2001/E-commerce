import React from 'react';
// import data from './data';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
          <header className="header">
              <div className="brand">
                  <button onClick={openMenu}>
                      &#9776;
                  </button>
                  <Link to="/" > NITT E Shop </Link>
                  {/* <a href="index.html"> NITT E Shop </a> */}
              </div>
              <div className="header-links">
                  <a href="cart.html">cart</a>
                  <a href="signIn.html">sign in</a>
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
