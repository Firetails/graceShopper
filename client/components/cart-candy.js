import React from 'react'
import {connect} from 'react-redux'
import {priceConverter} from '../../public/utilities'
import {updateCartCandyThunk} from '../store/cart-reducer'

class CartCandy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    this.setState({quantity: this.props.product.amount})
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.updateCart(this.props.product.candy.id, this.state.quantity)
  }

  render() {
    return (
      <div className="cart-container">
        <div className="cart-subcontainer-left">
          <h3>{this.props.product.candy.name}</h3>
          <img src={this.props.product.candy.imageUrl} />
        </div>
        <div className="cart-subcontainer-right">
          <form onSubmit={this.onSubmit}>
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
          <p>
            Price: ${priceConverter(
              this.props.product.candy.price * this.state.quantity
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
    updateCart: (candyId, amount) =>
      dispatch(updateCartCandyThunk(candyId, amount))
  }
}

export default connect(null, mapDispatchToProps)(CartCandy)
