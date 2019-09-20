import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../reducers/cart-reducer'
import Candy from './candy'

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
            {this.props.candies.map((candy, idx) => (
              <Candy candy={candy} key={idx} />
            ))}
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