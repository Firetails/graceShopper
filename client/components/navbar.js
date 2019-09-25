import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="nav-bar">
    <a href="/home" className="navbar-left">
      <h1 className="page-title"> OKASHI </h1>
      <p> 🍬 🍬 🍬Japanese Candy In Bulk 🍬 🍬 🍬 </p>
    </a>
    <nav>
      {isLoggedIn ? (
        <div className="navbar-right">
          {/* The navbar will show these links after you log in */}
          <Link className="page-title" to="/home">
            Home
          </Link>
          <Link className="page-title" to="/cart">
            Cart
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navbar-right">
          {/* The navbar will show these links before you log in */}
          <Link className="page-title" to="/cart">
            <img src="../../public/cart.png" />
          </Link>
          <Link className="page-title" to="/login">
            Login
          </Link>
          <Link className="page-title" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
