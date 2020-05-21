import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
class Products extends React.Component {
  state = {
    productsData: [],
  };

  componentDidMount() {
    this.setState({
      productsData: this.props.productsData,
    });
  }

  sortAscending = () => {
    this.props.history.replace({
      pathname: '/products',
      search: '?sort=asc',
    });
    const ascending = [...this.props.productsData].sort((a, b) => a.price - b.price);
    this.setState({
      productsData: ascending,
    });
  };
  sortDescending = () => {
    this.props.history.replace({
      pathname: '/products',
      search: '?sort=dsc',
    });
    const descending = [...this.props.productsData].sort((a, b) => b.price - a.price);
    this.setState({
      productsData: descending,
    });
  };

  reset = () => {
    this.props.history.replace({
      pathname: '/products',
      search: '',
    });
    this.setState({
      productsData: this.props.productsData,
    });
  };

  render() {
    return (
      <>
        <div className="sort">
          <button name="reset" className="sort-button reset" onClick={this.reset}>
            Reset
          </button>
          <button name="asc" className="sort-button" onClick={this.sortAscending}>
            Sort <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button name="desc" className="sort-button" onClick={this.sortDescending}>
            Sort <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <motion.ul className="products" initial="hidden" animate="visible" variants={list}>
          <motion.div className="title" variants={item}>
            <Link to="/">
              <button className="move">
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            </Link>
            <h1>
              Products
              {this.props.location.search === '?sort=asc' ? (
                <span>Ascending</span>
              ) : this.props.location.search === '?sort=dsc' ? (
                <span>Descending</span>
              ) : (
                ''
              )}
            </h1>
          </motion.div>
          <div className="products-header">
            <div>Name</div>
            <div>Description</div>
            <div>
              Price
              {this.props.location.search === '?sort=asc' ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : this.props.location.search === '?sort=dsc' ? (
                <FontAwesomeIcon icon={faArrowDown} />
              ) : (
                ''
              )}
            </div>
          </div>
          {this.state.productsData.map(({ name, price, id, slug, shortDescription }) => {
            return (
              <Link to={`/products/${slug}`} key={id}>
                <motion.li
                  className="product"
                  whileHover={{
                    boxShadow: '0px 0px 5px gray',
                    backgroundColor: 'rgb(128,128,128)',
                    color: 'rgb(255,255,255)',
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
  }
}

export default Products;
