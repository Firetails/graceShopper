import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../reducers/cart-reducer'
import CartCandy from './cart-candy'
import {calculateTotal} from '../../public/utilities'
const NoCandies = () => {
  return <p>There are no candies in the cart!</p>
}

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    console.log('Cart Component: ', this.props.candies)
    return (
      <div className="all-containers">
        <p>Welcome to your cart</p>
        {!this.props.candies ? (
          <NoCandies />
        ) : (
          <div>
            {this.props.candies.map((cartcandy, idx) => (
              <CartCandy cartcandy={cartcandy} key={idx} />
            ))}
            <p>Subtotal: ${calculateTotal(this.props.candies)}</p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  candies: state.cart.productsInCart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk(1))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
