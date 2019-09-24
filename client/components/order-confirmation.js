import React from 'react'
import {connect} from 'react-redux'

// import Candy from './candy'
// import {orderNumberGenerator} from '../../public/utilities'

class OrderConfirmation extends React.Component {
  render() {
    return (
      <div className="all-containers">
        <h1>Thank you for your order!</h1>
        <h3>
          An order confirmation email has been sent and we will notify you again
          once your order has shipped.
        </h3>
        <h4>Your order confirmation number is {this.props.orderNumber}</h4>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orderNumber: state.cart.orderNumber
})

export default connect(mapStateToProps, null)(OrderConfirmation)
