import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';
import { useSelector,  useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen(props) {

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());

    return () => {
      //
    };
  }, [])

    return loading ? <div>loading...</div> :
    error ? <div>{error}</div> :
    <ul className="products">
    {
      products.map(product =>
        <li key={product._id}>
          <Link to={"/product/" + product._id}>
          <div className="product">
              <img className="product-Image" src={product.image} alt="product1"></img>
              <div className="product-Name"><Link to={"/product/" + product._id}>{product.name}</Link></div>
              <div className="product-Brand">{product.brand}</div>
              <div className="product-Price">${product.price}</div>
          </div>
          </Link>
      </li>)
    }
  </ul>
}

export default HomeScreen;