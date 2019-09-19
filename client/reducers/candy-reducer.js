import Axios from 'axios'

const initialState = {
  candies: [],
  candiesError: '',
  selectedCandy: null
}

//action types
const GOT_ALL_CANDIES = 'GOT_ALL_CANDIES'
const GOT_SELECTED_CANDY = 'GOT_SELECTED_CANDY'

//action creators
const gotAllCandies = candies => ({
  type: GOT_ALL_CANDIES,
  candies
})

const gotSelectedCandy = candy => ({
  type: GOT_SELECTED_CANDY,
  candy
})

//Thunk creators
export const getAllCandiesThunk = () => async dispatch => {
  try {
    const {data} = await Axios.get('/api/candies')
    dispatch(gotAllCandies(data))
  } catch (err) {
    console.log('Unable to retrieve candies')
  }
}

export const getSelectedCandyThunk = candyId => async dispatch => {
  try {
    const {data} = await Axios.get(`/api/candies/${candyId}`)
    dispatch(gotSelectedCandy(data))
  } catch (err) {
    console.log(`Unable to retrieve candy id ${candyId}`)
  }
}

//reducers
const candyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_CANDIES:
      return {...state, candies: action.candies}
    case GOT_SELECTED_CANDY:
      return {...state, selectedCandy: action.candy}
    default:
      return state
  }
}

export default candyReducer
