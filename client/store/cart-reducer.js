import Axios from 'axios'

const initialState = {
  productsInCart: [],
  orderNumber: null //an array of objects (contains candy object and amount)
}

//action types
const UPDATE_CARTCANDY = 'UPDATE_CARTCANDY'
const SUBMIT_ORDER = 'SUBMIT_ORDER'

//action creators
const submitOrder = orderNumber => ({
  type: SUBMIT_ORDER,
  orderNumber
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

export const submitOrderThunk = () => async dispatch => {
  try {
    const {data} = await Axios.post('/api/cart/')

    await Axios.delete(`/api/cart`)
    dispatch(submitOrder(data))
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
    case SUBMIT_ORDER:
      return {
        ...state,
        productsInCart: [],
        orderNumber: action.orderNumber
      }
    default:
      return state
  }
}

export default cartReducer
