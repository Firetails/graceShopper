import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk, clearCartCandyThunk} from '../reducers/cart-reducer'
import CartCandy from './cart-candy'
import {calculateTotal} from '../../public/utilities'
const NoCandies = () => {
  return <p>There are no candies in the cart!</p>
}

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }
  onSubmit = event => {
    event.preventDefault()
    this.props.history.push('/orderConfirmation')
    this.props.clearCart()
  }

  render() {
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
            <p>Total: ${calculateTotal(this.props.candies)}</p>
            <form onSubmit={this.onSubmit}>
              <button className="submit-button" type="submit">
                Checkout
              </button>
            </form>
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
  getCart: () => dispatch(getCartThunk(1)),
  clearCart: () => dispatch(clearCartCandyThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
