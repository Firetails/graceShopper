// import MockAxiosAdapter from 'axios-mock-adapter'
// import {expect} from 'chai'
// import axios from 'axios'
// import {createStore, applyMiddleware} from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import reducer, {updateCartCandyThunk} from './cart-reducer'
// import enforceImmutableState from 'redux-immutable-state-invariant'

// let store
// let mockAxios

// describe('Thunks', () => {
//   beforeEach(() => {
//     mockAxios = new MockAxiosAdapter(axios)
//     store = createStore(
//       reducer,
//       applyMiddleware(thunkMiddleware, enforceImmutableState())
//     )
//   })
//   afterEach(() => {
//     mockAxios.restore()
//   })

//   describe('Update cart candies', () => {
//     let candyOne = {
//       name: 'someJCandy',
//       imageUrl:
//         'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
//     }
//     let candyTwo = {
//       name: 'someOtherCandy',
//       imageUrl:
//         'http://cdn.shopify.com/s/files/1/0768/4331/products/UHA-Puchao-Fruit-Mix-4-Flavor-wm-800x72_1024x1024.jpg?v=1502413813'
//     }
//     let cartCandy = {
//       cartId: 1,
//       candyId: 1,
//       amount: 10
//     }

//     beforeEach(() => {
//       mockAxios.onPut('/api/cart/1/1/10').reply(200, cartCandy)
//     })

//     it('sets the received candies on state', async () => {
//       await store.dispatch(updateCartCandyThunk(1, 1, 10))
//       const state = store.getState()
//       console.log('UPDATE PRODUCTS IN CART: ', state.productsInCart)
//       expect(state.productsInCart).to.deep.equal([cartCandy])
//     })
//   })
// })
