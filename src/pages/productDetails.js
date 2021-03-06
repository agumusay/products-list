import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

class ProductDetails extends React.Component {
  state = {
    product: '',
    nextSlug: '',
    prevSlug: '',
  };

  findCorrectProducts = (array) => {
    let currentProduct = array.find((product) => {
      return product.slug === this.props.match.params.slug;
    });
    let index = array.indexOf(currentProduct);
    this.setState({
      product: currentProduct,
      nextSlug: array[index + 1] && array[index + 1].slug,
      prevSlug: array[index - 1] && array[index - 1].slug,
    });
  };
  componentDidMount() {
    this.findCorrectProducts(this.props.productsData);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.findCorrectProducts(this.props.productsData);
    }
  }
  goPreviousPage = () => {
    this.props.history.goBack();
  };

  goNextProduct = (e) => {
    e.preventDefault();
    this.props.history.replace({
      pathname: `/products/${this.state.nextSlug}`,
    });
  };

  goPrevProduct = (e) => {
    e.preventDefault();
    this.props.history.replace({
      pathname: `/products/${this.state.prevSlug}`,
    });
  };

  render() {
    return (
      <>
        <div className="details">
          <div className="details-title">
            <button onClick={this.goPreviousPage} className="details-title-button move">
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <h1 className="details-title-name">{this.state.product.name}</h1>
          </div>

          <img src={this.state.product.image} alt="" className="details-img" />
          <p className="details-description">{this.state.product.description}</p>
          <p className="details-price">{`$${this.state.product.price}`}</p>
          <div className="btnContainer">
            <div>
              {this.state.prevSlug && (
                <a href="/#" onClick={this.goPrevProduct}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Previous</span>
                </a>
              )}
            </div>
            <div>
              {this.state.nextSlug && (
                <a href="/#" onClick={this.goNextProduct}>
                  <span>Next</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProductDetails;
