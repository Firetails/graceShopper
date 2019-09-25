import React from 'react'
import {connect} from 'react-redux'
import {getSelectedCandyThunk} from '../store/candy-reducer'
import {addCandyToCartThunk} from '../store/cart-reducer'
import {priceConverter} from '../../public/utilities'
import {toast} from 'react-toastify'

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
    // toast("Added to Cart!")
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
          <div className="single-container">
            <h1>{selectedCandy.name}</h1>
            <img src={selectedCandy.imageUrl} />
            <p>Description: {selectedCandy.description}</p>
            <p>Ingredients: {selectedCandy.ingredients}</p>
            <p>Price: ${priceConverter(selectedCandy.price)} /lb </p>
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

// import React, { Component } from 'react';
// import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // Call it once in your app. At the root of your app is the best place
// toast.configure()

// const App = () => {
//   const notify = () => toast("Wow so easy !");

//   return <button onClick={notify}>Notify !</button>;
// }
