import React from 'react'

import {orderNumberGenerator} from '../../public/utilities'

import {connect} from 'react-redux'

// import Candy from './candy'
// import {orderNumberGenerator} from '../../public/utilities'

class OrderConfirmation extends React.Component {
  render() {
    return (
      <div className="all-containers">
        <h1>Thank you for your order!</h1>
        <p>
          An order confirmation email has been sent and we will notify you again
          once your order has shipped.
        </p>
        <p>Your order confirmation number is {orderNumberGenerator()}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderNumber: state.cart.orderNumber
})

export default connect(mapStateToProps, null)(OrderConfirmation)
