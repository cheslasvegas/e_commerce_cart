import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadCart, removeProduct} from '../../store/actions/floatCartActions';
import {updateCart} from '../../store/actions/updateCartActions';
import CartProduct from './CartProduct';
import util from '../../util';


class FloatCart extends Component {

    state = {
        isOpen: false,
    };


    componentDidMount() {
        setTimeout(() => {
            this.props.updateCart(this.props.cartProducts);
        }, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newProduct !== this.props.newProduct) {
            this.addProduct(nextProps.newProduct);
        }

        if (nextProps.productToRemove !== this.props.productToRemove) {
            this.removeProduct(nextProps.productToRemove);
        }
    }

    openFloatCart = () => {
        this.setState({isOpen: true});
    }

    closeFloatCart = () => {
        this.setState({isOpen: false});
    }

    addProduct = (product) => {
        const {cartProducts, updateCart} = this.props;
        let productAlreadyInCart = false;

        cartProducts.forEach(cp => {
            if (cp.id === product.id) {
                cp.quantity += product.quantity;
                productAlreadyInCart = true;
            }
        });

        if (!productAlreadyInCart) {
            cartProducts.push(product);
        }

        updateCart(cartProducts);
        this.openFloatCart();
    }

    removeProduct = (product) => {
        const {cartProducts, updateCart} = this.props;

        const index = cartProducts.findIndex(p => p.id === product.id);
        if (index >= 0) {
            cartProducts.splice(index, 1);
            updateCart(cartProducts);
        }
    }


    proceedToCheckout = () => {
        const {totalPrice, productQuantity, currencyFormat, currencyId} = this.props.cartTotals;

        if (!productQuantity) {
            alert("Добавьте продукт в корзину!");
        } else {
            alert(`Заказано на сумму: ${currencyFormat} ${util.formatPrice(totalPrice, currencyId)}`);
        }
    }

    render() {
        const {cartTotals, cartProducts, removeProduct} = this.props;

        const products = cartProducts.map(p => {
            return (
                <CartProduct
                    product={p}
                    removeProduct={removeProduct}
                    key={p.id}
                />
            );
        });

        let classes = ['float-cart'];

        if (!!this.state.isOpen) {
            classes.push('float-cart--open');
        }

        return (
            <div className={classes.join(' ')}>
                {!this.state.isOpen && (
                    <span
                        onClick={() => this.openFloatCart()}
                        className="bag bag--float-cart-closed"
                    >
            <span className="bag__quantity">{cartTotals.productQuantity}</span>
          </span>
                )}
                <div className="float-cart__content">
                    <div className="float-cart__header">
                        {this.state.isOpen && (
                            <div
                                onClick={() => this.closeFloatCart()}
                                className="float-cart__close-btn"
                            >
                                X
                            </div>
                        )}
                        <span className="bag">
              <span className="bag__quantity">
                {cartTotals.productQuantity}
              </span>
            </span>
                        <span className="header-title">Корзина</span>
                    </div>

                    <div className="float-cart__shelf-container">
                        {products}
                        {!products.length && (
                            <p className="shelf-empty">
                                Добавьте продукт в корзину!
                            </p>
                        )}
                    </div>

                    <div className="float-cart__footer">
                        <div className="sub">ИТОГО</div>
                        <div className="sub-price">
                            <small className="sub-price__installment">
                                {(
                                    <span>
                    {`${cartTotals.currencyFormat} ${util.formatPrice(cartTotals.totalPrice, cartTotals.currencyId)}`}
                  </span>
                                )}
                            </small>
                        </div>
                        <div onClick={() => this.proceedToCheckout()} className="buy-btn">
                            ОПЛАТИТЬ
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FloatCart.propTypes = {
    loadCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    cartProducts: PropTypes.array.isRequired,
    newProduct: PropTypes.object,
    removeProduct: PropTypes.func,
    productToRemove: PropTypes.object,
};

const mapStateToProps = state => ({
    cartProducts: state.cartProducts.items,
    newProduct: state.cartProducts.item,
    productToRemove: state.cartProducts.itemToRemove,
    cartTotals: state.cartTotals.item,
});

export default connect(mapStateToProps, {loadCart, updateCart, removeProduct})(FloatCart);

