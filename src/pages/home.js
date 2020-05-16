import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const topProducts = props.productsData.sort((a, b) => b.price - a.price).slice(0, 4);
  console.log(topProducts);
  return (
    <section className="home">
      <div className="home-header">
        <h2 className="home-header-title">Welcome, visitor!</h2>
        <Link to="/products">
          <button className="home-header-nav">Go To Products</button>
        </Link>
      </div>

      <ul className="top-products">
        {topProducts.map((product) => {
          return (
            <li className="top" key={product.id}>
              <h1 className="top-title">{product.name}</h1>
              <div className="top-price">{`$${product.price}`}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Home;
