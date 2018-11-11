import React from 'react';
import PropTypes from "prop-types";
import Thumb from '../Thumb';
import util from '../../util';


const Product = (props) => {
  const product = props.product;

  product.quantity = 1;

    let formattedPrice = util.formatPrice(product.price, product.currencyId);
  
  return (
    <div className="shelf-item">
      <Thumb
        classes="shelf-item__thumb"
         src={require(`../../static/products/${product.id}.jpg`)}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val"><small>{product.currencyFormat}</small>
          <b>
            {formattedPrice.substr(0, formattedPrice.length - 3)}
          </b>
          <span>
            {formattedPrice.substr(formattedPrice.length - 3, 3)}
          </span>
        </div>
      </div>
      <div onClick={() => props.addProduct(product)} className="shelf-item__buy-btn">Добавить </div>
    </div>
  );
}


Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default Product;