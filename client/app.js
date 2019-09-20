import React from 'react'

import {Navbar, Candies} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar classname="nav-bar" />
      {/* <Candies /> */}
      <Routes />
    </div>
  )
}

export default App
