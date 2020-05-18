import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};
const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 200 },
};
const Products = ({ match, productsData }) => {
  return (
    <>
      <motion.ul className="products" initial="hidden" animate="visible" variants={list}>
        <motion.div className="title" variants={item}>
          <Link to="/">
            <button className="move">
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </Link>
          <h1>Products</h1>
        </motion.div>
        <div className="products-header">
          <div>Name</div>
          <div>Description</div>
          <div>Price</div>
        </div>
        {productsData.map(({ name, price, id, slug, shortDescription }) => {
          console.log(match.url);
          return (
            <Link to={`/products/${slug}`} key={id}>
              <motion.li
                className="product"
                whileHover={{
                  boxShadow: '0px 0px 5px gray',
                  backgroundColor: 'gray',
                  color: 'white',
                }}
                variants={item}
              >
                <div className="product-name">{name}</div>
                <div className="product-description">{shortDescription}</div>
                <div className="product-price">{`$ ${price}`}</div>
              </motion.li>
            </Link>
          );
        })}
      </motion.ul>
    </>
  );
};

export default Products;
