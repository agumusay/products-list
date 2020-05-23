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

class Products extends React.Component {
  state = {
    productsArray: [],
    sortedProducts: [],
    search: '',
  };

  componentDidMount() {
    const parse = queryString.parse(this.props.location.search);

    this.setState({
      productsArray:
        parse.sort === 'asc'
          ? [...this.props.productsData].sort((a, b) => a.price - b.price)
          : parse.sort === 'dsc'
          ? [...this.props.productsData].sort((a, b) => b.price - a.price)
          : this.props.productsData,
      sortedProducts: [...this.props.productsData],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      if (!this.state.search) {
        this.setState({
          productsArray: [...this.state.sortedProducts],
        });
      }
    }
  }

  sortAscending = () => {
    this.setState({
      productsArray: this.state.productsArray.slice().sort((a, b) => a.price - b.price),
      sortedProducts: this.state.sortedProducts.slice().sort((a, b) => a.price - b.price),
    });
    this.props.history.replace({
      search: '?sort=asc',
    });
  };
  sortDescending = () => {
    this.setState({
      productsArray: this.state.productsArray.slice().sort((a, b) => b.price - a.price),
      sortedProducts: this.state.sortedProducts.slice().sort((a, b) => b.price - a.price),
    });
    this.props.history.replace({
      search: '?sort=dsc',
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      search: e.target.value,
      productsArray: e.target.value
        ? this.state.sortedProducts.filter((product) => {
            return String(product.name.toLowerCase()).includes(e.target.value);
          })
        : this.state.productsArray,
    });
  };

  reset = () => {
    this.setState({
      search: '',
      productsArray: [...this.props.productsData],
      sortedProducts: [...this.props.productsData],
    });
    this.props.history.replace({
      search: '',
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
            onClick={this.reset}
            initial={{ translateY: -100 }}
            animate={{ translateY: 0 }}
            transition={{ duration: 1 }}
          >
            Reset
          </motion.button>
          <motion.button
            name="asc"
            className="sort-button"
            onClick={this.sortAscending}
            initial={{ translateX: -100 }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.7 }}
          >
            Sort <FontAwesomeIcon icon={faArrowUp} />
          </motion.button>
          <motion.button
            name="desc"
            className="sort-button"
            onClick={this.sortDescending}
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

          {this.state.productsArray.map(({ name, price, id, slug, shortDescription }, i) => {
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
