import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = (props) => {
  let [index, setIndex] = useState(0);
  const { match, history, productsData } = props;
  console.log(history);
  useEffect(() => {
    const initialProduct = productsData.find((product) => {
      return product.slug === match.params.slug;
    });
    setIndex(productsData.indexOf(initialProduct));
  }, [match.params.slug, productsData]);

  const goPreviousPage = () => {
    props.history.goBack();
  };

  const backNForth = (e) => {
    setIndex(e.currentTarget.name === 'next' ? (index += 1) : (index -= 1));

    history.replace({
      pathname: `/products/${productsData[index].slug}`,
    });
  };

  let product = productsData[index];
  return (
    <>
      <div className="details">
        <div className="details-title">
          <button onClick={goPreviousPage} className="details-title-button move">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <h1 className="details-title-name">{product.name}</h1>
        </div>

        <img src={product.image} alt="" className="details-img" />
        <p className="details-description">{product.description}</p>
        <p className="details-price">{`$${product.price}`}</p>
        <div className="btnContainer">
          <button
            name="previous"
            className="move"
            onClick={backNForth}
            disabled={!index > 0 ? true : false}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Previous</span>
          </button>

          <button
            name="next"
            className="move"
            onClick={backNForth}
            disabled={index < productsData.length - 1 ? false : true}
          >
            <span>Next</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
