import React from 'react'
import {connect} from 'react-redux'
import {getSelectedCandyThunk} from '../store/candy-reducer'
import {addCandyToCartThunk} from '../store/cart-reducer'

import {priceConverter} from '../../public/utilities'

class SelectedCandy extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.addToCart(this.props.selectedCandy.id, this.state.quantity)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getCandy(id)
  }

  render() {
    const {selectedCandy} = this.props
    return (
      <div>
        {!this.props.selectedCandy ? (
          <h1>Candy Not Found!!!</h1>
        ) : (
          <div className="item-container">
            <h1>{selectedCandy.name}</h1>
            <img src={selectedCandy.imageUrl} />
            <p>Description: {selectedCandy.description}</p>
            <p>Ingredients: {selectedCandy.ingredients}</p>
            <h6>Price: ${priceConverter(selectedCandy.price)} /lb </h6>
            <form onSubmit={this.onSubmit}>
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
                Add to Cart
              </button>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {selectedCandy: state.candy.selectedCandy}
}

const mapDispatchToProps = dispatch => {
  return {
    getCandy: candyId => dispatch(getSelectedCandyThunk(candyId)),
    addToCart: (candyId, amount) =>
      dispatch(addCandyToCartThunk(candyId, amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCandy)
