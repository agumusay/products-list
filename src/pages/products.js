import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 2,
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
    filteredArray: [],
    productsData: [],
    parse: '',
  };

  componentDidMount() {
    this.setState({
      productsData: [...this.props.productsData],
      filteredArray: [...this.props.productsData],
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setState({
        parse: queryString.parse(this.props.location.search),
      });
    }
  }

  sortAscending = () => {
    const ascending = [...this.props.productsData].sort((a, b) => a.price - b.price);
    this.setState({
      productsData: ascending,
    });
    this.props.history.replace({
      pathname: '/products',
      search: '?sort=asc',
    });
  };
  sortDescending = () => {
    const descending = [...this.props.productsData].sort((a, b) => b.price - a.price);
    this.setState({
      productsData: descending,
    });
    this.props.history.replace({
      pathname: '/products',
      search: '?sort=dsc',
    });
  };

  onChangeHandler = (e) => {
    e.preventDefault();
    const filteredArray = [...this.state.filteredArray].filter((product) =>
      String(product.name.toLowerCase()).startsWith(e.target.value),
    );

    this.setState({
      productsData: filteredArray || this.state.productsData,
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

        <label htmlFor="filter">Filter by name or description</label>
        <input type="text" name="filter" id="filter" onChange={this.onChangeHandler} />
        <motion.ul className="products" initial="hidden" animate="visible" variants={list}>
          <motion.div className="title" variants={item}>
            <Link to="/">
              <button className="move">
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            </Link>
            <h1>
              Products
              {this.state.parse.sort === 'asc' ? (
                <span>Ascending</span>
              ) : this.state.parse.sort === 'dsc' ? (
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
              {this.state.parse.sort === 'asc' ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : this.state.parse.sort === 'dsc' ? (
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
                  key={id}
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
