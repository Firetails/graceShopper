import React from 'react'
import {connect} from 'react-redux'
import {getAllCandiesThunk} from '../reducers/candy-reducer'
import {priceConverter} from '../../public/utilities'

class Candy extends React.Component {
  handleDeletion(event, candyId) {
    event.preventDefault()
    this.props.getAllCandies(candyId)
  }
  render() {
    return (
      <div className="item-container">
        <a href={`/candies/${this.props.candy.id}`}>
          <h1>{this.props.candy.name}</h1>{' '}
        </a>
        <img src={this.props.candy.imageUrl} />
        <p>{this.props.candy.description}</p>
        <p>Price: ${priceConverter(this.props.candy.price)} /lb </p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getAllCandies: candyId => dispatch(getAllCandiesThunk(candyId))
})

export default connect(null, mapDispatchToProps)(Candy)
