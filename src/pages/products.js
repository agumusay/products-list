import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import queryString from 'query-string';

const listItemVariants = {
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
  hidden: { opacity: 0, y: -100 },
};

const sortProducts = (products, sortingOrder) => {
  if (sortingOrder === 'asc') return [...products].sort((a, b) => a.price - b.price);
  if (sortingOrder === 'dsc') return [...products].sort((a, b) => b.price - a.price);
  return [...products];
};
class Products extends React.Component {
  state = {
    initialArray: [...this.props.productsData],
    productsArray: [...this.props.productsData],
    filterTerm: '',
  };

  componentDidMount() {
    let parse = queryString.parse(this.props.location.search);
    this.setState({
      productsArray: sortProducts(this.state.productsArray, parse.sort),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      let parse = queryString.parse(this.props.location.search);
      this.setState({
        productsArray: parse.sort
          ? sortProducts(this.state.productsArray, parse.sort)
          : this.state.initialArray,
      });
    }
  }

  setSortingOrder = (order = '') => {
    this.props.history.replace({
      pathname: '/products',
      search: order ? `?sort=${order}` : '',
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      filterTerm: e.target.value,
    });
  };

  render() {
    const parse = queryString.parse(this.props.location.search);

    return (
      <>
        <div className="sort">
          <motion.button
            name="reset"
            className="sort-button reset"
            onClick={() => this.setSortingOrder()}
            initial={{ translateY: -100 }}
            animate={{ translateY: 0 }}
            transition={{ duration: 1 }}
          >
            Reset
          </motion.button>
          <motion.button
            name="asc"
            className="sort-button"
            onClick={() => this.setSortingOrder('asc')}
            initial={{ translateX: -100 }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.7 }}
          >
            Sort <FontAwesomeIcon icon={faArrowUp} />
          </motion.button>
          <motion.button
            name="dsc"
            className="sort-button"
            onClick={() => this.setSortingOrder('dsc')}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            Sort <FontAwesomeIcon icon={faArrowDown} />
          </motion.button>
        </div>

        <label htmlFor="filter">Filter by name or description</label>
        <input
          type="text"
          name="filter"
          id="filter"
          value={this.state.search}
          onChange={this.onChangeHandler}
        />
        <motion.ul className="products">
          <motion.div className="title">
            <Link to="/">
              <button className="move">
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            </Link>
            <h1>
              Products
              {parse.sort === 'asc' ? (
                <span>Ascending</span>
              ) : parse.sort === 'dsc' ? (
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
              {parse.sort === 'asc' ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : parse.sort === 'dsc' ? (
                <FontAwesomeIcon icon={faArrowDown} />
              ) : (
                ''
              )}
            </div>
          </div>

          {this.state.productsArray
            .filter(
              (product) =>
                product.name.toLowerCase().includes(this.state.filterTerm.toLowerCase()) ||
                product.shortDescription
                  .toLowerCase()
                  .includes(this.state.filterTerm.toLowerCase()),
            )
            .map(({ name, price, id, slug, shortDescription }, i) => {
              return (
                <Link to={`/products/${slug}`} key={id}>
                  <motion.li
                    className="product"
                    whileHover={{
                      boxShadow: '0px 0px 5px gray',
                      backgroundColor: 'rgb(128, 128, 128)',
                      color: 'rgb(255, 255, 255)',
                    }}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={listItemVariants}
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
