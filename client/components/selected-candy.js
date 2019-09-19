import React from 'react'
import {connect} from 'react-redux'
import {getSelectedCandyThunk} from '../reducers/reducer'
import Axios from 'axios'
import priceConverter from '../../public/utilities'

class SelectedCandy extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: '',
      price: ''
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = () => {
    const {quantity, price} = this.state
    Axios.post('/api/cart', {quantity, price})
    this.setState({
      quantity: '',
      price: ''
    })
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
          <div>
            <h1>{selectedCandy.name}</h1>
            <img src={selectedCandy.imageUrl} />
            <p>{selectedCandy.description}</p>
            <p>{selectedCandy.ingredients}</p>
            <h6>Price: ${priceConverter(selectedCandy.price)} /lb </h6>
            <form onSubmit={this.onSubmit}>
              <label>Quantity: </label>
              <input
                type="text"
                quantity="quantity"
                value={this.state.quantity}
                onChange={event => this.onChange(event)}
              />
              <br />
              <button type="submit">Order</button>
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
    getCandy: candyId => dispatch(getSelectedCandyThunk(candyId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCandy)
