import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const titleVariants = {
  initial: {
    y: 150,
  },
  in: {
    y: 0,
  },
  out: {
    y: 150,
  },
};
const Home = (props) => {
  const topProducts = props.productsData.sort((a, b) => b.price - a.price).slice(0, 4);
  return (
    <motion.div className="home" initial="initial" animate="in" exit="out" variants={titleVariants}>
      <div className="home-header">
        <motion.h2 className="home-header-title">Welcome, visitor!</motion.h2>
        <NavLink to="/products">
          <button className="home-header-nav">Go To Products</button>
        </NavLink>
      </div>

      <ul className="top-products">
        {topProducts.map(({ id, name, price, slug }) => {
          return (
            <NavLink to={`/products/${slug}`} key={id}>
              <li className="top">
                <h1 className="top-title">{name}</h1>
                <div className="top-price">{`$${price}`}</div>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default Home;
