import Axios from 'axios'

const initialState = {
  productsInCart: [] //an array of objects (contains candy object and amount)
}

//action types
const UPDATE_CARTCANDY = 'UPDATE_CARTCANDY'
const CLEAR_CART = 'CLEAR_CART'

//action creators
const clearCart = () => ({
  type: CLEAR_CART
})

const updateCartCandy = cart => ({
  type: UPDATE_CARTCANDY,
  cart
})

//Thunk creators
export const getCartThunk = () => async dispatch => {
  try {
    const {data} = await Axios.get(`/api/cart`)
    dispatch(updateCartCandy(data))
  } catch (err) {
    console.error(err)
  }
}

export const addCandyToCartThunk = (candyId, amount) => async dispatch => {
  try {
    const {data} = await Axios.post(`/api/cart/${candyId}/${amount}`)
    dispatch(updateCartCandy(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateCartCandyThunk = (candyId, amount) => async dispatch => {
  try {
    const {data} = await Axios.put(`/api/cart/${candyId}/${amount}`)
    dispatch(updateCartCandy(data))
  } catch (err) {
    console.error(err)
  }
}

export const clearCartCandyThunk = () => async dispatch => {
  try {
    const {data} = await Axios.delete(`/api/cart`)
    dispatch(clearCart())
  } catch (err) {
    console.error(err)
  }
}

//reducers
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CARTCANDY: {
      return {
        ...state,
        productsInCart: action.cart
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
