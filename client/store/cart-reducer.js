import Axios from 'axios'

const initialState = {
  productsInCart: [] //an array of objects (contains candy object and amount)
}

//action types
const UPDATE_CARTCANDY = 'UPDATE_CARTCANDY'

//action creators
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

//reducers
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CARTCANDY: {
      return {
        ...state,
        productsInCart: action.cart
      }
    }
    default:
      return state
  }
}

export default cartReducer
