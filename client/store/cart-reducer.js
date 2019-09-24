import Axios from 'axios'

const initialState = {
  status: 'cart',
  productsInCart: [] //an array of cartcandy objects
}

//action types
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CARTCANDY = 'UPDATE_CARTCANDY'
const CLEAR_CART = 'CLEAR_CART'

//action creators
const clearCart = () => ({
  type: CLEAR_CART
})

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const addedToCart = cartCandy => ({
  type: ADD_TO_CART,
  cartCandy
})

const updateCartCandy = cartCandy => ({
  type: UPDATE_CARTCANDY,
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
      `/api/candies/${candyId}/${cartId}/${amount}`
    )
    dispatch(addedToCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateCartCandyThunk = (
  cartId,
  candyId,
  amount
) => async dispatch => {
  try {
    const {data} = await Axios.put(`/api/cart/${cartId}/${candyId}/${amount}`)
    dispatch(updateCartCandy(data[1]))
  } catch (err) {
    console.error(err)
  }
}

export const clearCartCandyThunk = (cartId, candyId) => async dispatch => {
  try {
    const {data} = await Axios.delete(`/api/cart/${cartId}/${candyId}`)
    dispatch(clearCart())
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
    case UPDATE_CARTCANDY: {
      let updatedProducts = [
        ...state.productsInCart.filter(
          el => el.id !== action.cartCandy.candyId
        ),
        action.cartCandy
      ]
      return {
        ...state,
        productsInCart: updateCartCandy
      }
    }
    case CLEAR_CART:
      return {
        ...state,
        productsInCart: []
      }
    default:
      return state
  }
}

export default cartReducer
