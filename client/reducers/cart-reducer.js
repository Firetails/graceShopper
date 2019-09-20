import Axios from 'axios'

const initialState = {
  status: 'cart',
  productsInCart: [] //an array of cartcandy objects
}

//action types
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'

//action creators
const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const addedToCart = cartCandy => ({
  type: ADD_TO_CART,
  cartCandy
})

//Thunk creators
export const getCartThunk = cartId => async dispatch => {
  try {
    const {data} = await Axios.get(`/api/cart/${cartId}`)
    dispatch(gotCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const addCandyToCartThunk = (
  cartId,
  candyId,
  amount
) => async dispatch => {
  try {
    const {data} = await Axios.post(
      `/api/${candyId}/${cartId}?amount=${amount}`
    )
    dispatch(addedToCart(data))
  } catch (err) {
    console.error(err)
  }
}

//reducers
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CART:
      return {
        ...state,
        status: action.cart.status,
        productsInCart: action.cart.candy
      }
    case ADD_TO_CART:
      return {
        ...state,
        productsInCart: [...state.productsInCart, action.cartCandy]
      }
    default:
      return state
  }
}

export default cartReducer