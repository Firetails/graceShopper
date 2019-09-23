import React from 'react'
import Candy from './candy'
import {orderNumberGenerator} from '../../public/utilities'

class OrderConfirmation extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="all-containers">
        <h1>Thank you for your order!</h1>
        <h3>
          An order confirmation email has been sent and we will notify you again
          once your order has shipped.
        </h3>
        <h4>Your order confirmation number is {orderNumberGenerator()}</h4>
      </div>
    )
  }
}

export default OrderConfirmation
