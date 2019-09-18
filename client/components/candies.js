import React from 'react'
import {connect} from 'react-redux'
import Students from './students'
import {getAllCandiesThunk} from '../reducers'

const NoCandies = () => {
  return <p>There are no candies in the database!</p>
}

class Candies extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    event.preventDefault()
    this.props.getAllCandies()
  }
  handleClick(event) {
    event.preventDefault()
    this.props.history.push('/addnewstudent')
  }
  render() {
    return (
      <div className="id">
        <div className="items-header">
          <h2>All Students</h2>
          <input
            type="submit"
            value="Add a Student"
            onClick={this.handleClick}
          />
        </div>
        <div className="all-containers">
          {!this.props.students.length > 0 ? (
            <NoCandies />
          ) : (
            <div>
              {this.props.students.map((student, idx) => (
                <Candy student={student} key={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  candies: state.candies
})

const mapDispatchToProps = dispatch => ({
  getAllCandies: () => dispatch(getAllCandiesThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Candies)
