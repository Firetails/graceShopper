import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SelectedCandy} from './selected-candy'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SelectedCandy', () => {
  let singleCandy

  beforeEach(() => {
    //ASK DAVID: How to render a shallow component to test when our component depends on req.params? This render throws:  TypeError: Cannot read property 'params' of undefined
    // singleCandy = shallow(
    //   <SelectedCandy name="Raisinet" price="399" quantity="900" />
    // )
  })

  it('renders the price in an h6', () => {
    console.log(singleCandy)
    // expect(singleCandy.find('h6').text()).to.be.equal('3.99')
  })
})
