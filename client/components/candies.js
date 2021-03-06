import React from 'react'
import {connect} from 'react-redux'
import {getAllCandiesThunk} from '../store/candy-reducer'
import Candy from './candy'

const NoCandies = () => {
  return <p>There are no candies in the database!</p>
}

class Candies extends React.Component {
  componentDidMount() {
    this.props.getAllCandies()
  }

  render() {
    return (
      <div>
        {!this.props.candies ? (
          <NoCandies />
        ) : (
          <div className="all-products">
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
  candies: state.candy.candies
})

const mapDispatchToProps = dispatch => ({
  getAllCandies: () => dispatch(getAllCandiesThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Candies)
