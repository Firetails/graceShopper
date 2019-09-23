import React from 'react'
import {connect} from 'react-redux'
import priceConverter from '../../public/utilities'
import {updateCartCandyThunk} from '../reducers/cart-reducer'

class CartCandy extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: ''
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = () => {
    console.log('On Submit', this.props)
    this.props.updateCart(
      1,
      this.props.cartCandy.cartCandy.id,
      this.state.quantity
    )
  }

  render() {
    console.log('In cart-candy component', this.props.cartcandy.cartCandy)
    return (
      <div className="cart-container">
        {/* <a href={`/candies/${this.props.candy.candyId}`}> */}
        <h3>{this.props.cartcandy.name}</h3> {/* </a> */}
        <img src={this.props.cartcandy.imageUrl} />
        <p>{this.props.cartcandy.cartCandy.amount}</p>
        <p>Price: ${priceConverter(this.props.cartcandy.price)} /lb </p>
        <form onSubmit={this.onSubmit()}>
          <label>Quantity: </label>
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={event => this.onChange(event)}
          />
          <br />
          <button className="submit-button" type="submit">
            Update Quantity
          </button>
        </form>
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
