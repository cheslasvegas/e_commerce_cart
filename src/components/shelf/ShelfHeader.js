import React from 'react';
import PropTypes from 'prop-types';

import Sort from './Sort';


const ShelfHeader = (props) => {
  return (
    <div className="shelf-container-header">
      <p className="products-found">
        <span>Найдено продукт(ов): {props.productsLength}</span>
      </p>
      <Sort />
    </div>
  );
}

ShelfHeader.propTypes = {
  productsLength: PropTypes.number.isRequired,
}

export default ShelfHeader;