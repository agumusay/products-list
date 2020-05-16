import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Products = ({ match, productsData }) => {
  console.log(productsData);
  return (
    <>
      <ul className="products">
        <div className="title">
          <Link to="/">
            <button className="move">
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </Link>
          <h1>Products</h1>
        </div>
        <div className="products-header">
          <div>Name</div>
          <div>Description</div>
          <div>Price</div>
        </div>
        {productsData.map(({ name, price, id, slug, shortDescription }) => {
          return (
            <Link to={`${match.url}/${slug}`} key={id}>
              <li className="product">
                <div className="product-name">{name}</div>
                <div className="product-description">{shortDescription}</div>
                <div className="product-price">{`$ ${price}`}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default Products;
