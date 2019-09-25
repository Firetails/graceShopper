import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk, submitOrderThunk} from '../store/cart-reducer'
import CartCandy from './cart-candy'
import {calculateTotal} from '../../public/utilities'
const NoCandies = () => {
  return <p>There are no candies in the cart!</p>
}

const CartItem = props => {
  const candy = props.candy
  if (candy.amount !== 0) {
    return (
      <tr>
        <td>
          <CartCandy product={candy} />
        </td>
      </tr>
    )
  }
  return null
}

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }
  //checkout button
  onSubmit = event => {
    event.preventDefault()

    if (this.props.candies.length !== 0) {
      this.props.history.push('/orderConfirmation')
      this.props.clearCart()
    }

  }

  render() {
    const candies = this.props.candies
    return (
      <div className="all-containers">
        {!candies ? (
          <NoCandies />
        ) : (
          <div>
            <table>
              <tbody>
                {candies.map(product => (
                  <CartItem candy={product} key={product.candy.id} />
                ))}
              </tbody>
            </table>

            <p>Total: ${calculateTotal(candies)}</p>
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
  getCart: () => dispatch(getCartThunk()),
  submitOrder: () => dispatch(submitOrderThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
