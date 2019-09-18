import React from 'react'

import {Navbar, Candies} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Candies />
      <Routes />
    </div>
  )
}

export default App
