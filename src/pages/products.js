import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';

class Products extends React.Component {
  state = {
    productsArray: [],
    sortedProducts: [],
    search: '',
  };

  componentDidMount() {
    this.setState({
      productsArray: [...this.props.productsData],
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
      pathname: '/products',
      search: '?sort=asc',
    });
  };
  sortDescending = () => {
    this.setState({
      productsArray: this.state.productsArray.slice().sort((a, b) => b.price - a.price),
      sortedProducts: this.state.sortedProducts.slice().sort((a, b) => b.price - a.price),
    });
    this.props.history.replace({
      pathname: '/products',
      search: '?sort=dsc',
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      search: e.target.value,
      productsArray: e.target.value
        ? this.state.sortedProducts.filter((product) => {
            return String(product.name.toLowerCase()).startsWith(e.target.value);
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
      pathname: '/products',
      search: '',
    });
  };

  render() {
    const parse = queryString.parse(this.props.location.search);

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
        <input
          type="text"
          name="filter"
          id="filter"
          value={this.state.search}
          onChange={this.onChangeHandler}
        />
        <ul className="products">
          <div className="title">
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
          </div>
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
          {this.state.productsArray.map(({ name, price, id, slug, shortDescription }) => {
            return (
              <Link to={`/products/${slug}`} key={id}>
                <li className="product" key={id}>
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
  }
}

export default Products;
