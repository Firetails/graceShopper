'use strict'
const {expect} = require('chai')
const request = require('supertest')
// Assertions
// const chai = require('chai');
// const expect = chai.expect;
const chaiThings = require('chai-things')
chai.use(chaiThings)

import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({
  adapter: new Adapter()
})
import {SelectedCandy} from './selected-candy'

describe('Front-end', () => {
  const candies = [
    {
      name: 'Pocky',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
    },
    {
      name: 'Muscat gummies',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
    },
    {
      name: 'Melon chews',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
    }
  ]
})

describe('SelectedCandy component', () => {
  let renderedSelectedCandy
  let selectedCandyInstance

  beforeEach(() => {
    renderedSelectedCandy = shallow(<SelectedCandy />)
    selectedCandyInstance = renderedSelectedCandy.instance()
  })

  it('renders the name of the candy in an <h1>, which should be inside a <div>', () => {
    expect(renderedSelectedCandy.find('h1').text()).to.equal('Pocky')
  })

  it('renders a list of <SelectedCandy /> components with the selected candy passed in, inside of the same <div> as the <h1> name of the candy', () => {
    renderedSelectedCandy = renderedSelectedCandy.find(SelectedCandy)
    expect(renderedSelectedCandy.length).to.equal(3)
    expect(renderedSelectedCandy.get(2).props.candies.name).to.equal(
      'Muscat gummies'
    )
    expect(renderedSelectedCandy.get(3).props.candies.name).to.equal(
      'Melon chews'
    )
  })
})
