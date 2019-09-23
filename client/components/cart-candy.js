import React from 'react'
import {connect} from 'react-redux'
import {priceConverter} from '../../public/utilities'
import {updateCartCandyThunk} from '../reducers/cart-reducer'

class CartCandy extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }
  componentDidMount() {
    this.setState({quantity: this.props.cartcandy.cartCandy.amount})
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onUpdateSubmit = event => {
    event.preventDefault()
    this.props.updateCart(
      this.props.cartcandy.cartCandy.cartId,
      this.props.cartcandy.cartCandy.candyId,
      this.state.quantity
    )
  }

  // onDeleteSubmit = event => {

  // }

  render() {
    return (
      <div className="cart-container">
        <div className="cart-subcontainer-left">
          <h3>{this.props.cartcandy.name}</h3>
          <img src={this.props.cartcandy.imageUrl} />
        </div>
        <div className="cart-subcontainer-right">
          <form onSubmit={this.onUpdateSubmit}>
            <label>Quantity: </label>
            <input
              type="number"
              name="quantity"
              min="0"
              max="9999"
              value={this.state.quantity}
              onChange={event => this.onChange(event)}
            />
            <br />
            <button className="submit-button" type="submit">
              Update Quantity
            </button>
          </form>
          {/* <form onSubmit={this.onDeleteSubmit}>
          <button className="delete-button" type="submit">
              Remove
            </button>
          </form> */}
          <p>
            Price: ${priceConverter(
              this.props.cartcandy.price * this.state.quantity
            )}{' '}
            /lb{' '}
          </p>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCart: (cartId, candyId, amount) =>
      dispatch(updateCartCandyThunk(cartId, candyId, amount))
  }
}

export default connect(null, mapDispatchToProps)(CartCandy)
