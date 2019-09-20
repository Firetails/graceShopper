import React from 'react'
import {connect} from 'react-redux'
import priceConverter from '../../public/utilities'
import Axios from 'axios'

class CartCandy extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: ''
    }
  }
  onSubmit = () => {
    const {quantity} = this.state
    Axios.post('/api/cart', {quantity, price})
    this.setState({
      quantity: ''
    })
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
        <form onSubmit={this.onSubmit}>
          <label>Quantity: </label>
          <input
            type="text"
            quantity="quantity"
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

// const mapDispatchToProps = dispatch => ({
//   getAllCandies: candyId => dispatch(getAllCandiesThunk(candyId))
// })

export default connect(null, null)(CartCandy)
