const initialState = {
  sharedValue: [],
  stories: null
};


function sharedReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SHARED_VALUE':
      if (state.sharedValue.includes(action.payload)) {
        return {...state, sharedValue: [...state.sharedValue]}
      } else {
        return {
          ...state,
	  sharedValue: [...state.sharedValue, action.payload],
        }
      }
    case 'DELETE_FROM_SHARED_VALUE':
      const newValue = state.sharedValue.filter((item) => item !== action.payload);
      return {...state, sharedValue: newValue}

    case 'SET_STORIES':
      const storiesList = [];
      action.payload.forEach(arr => {
        storiesList.push(...arr);
      });
      return {...state, stories: storiesList}
    default:
      return state;
  }
}

export default sharedReducer;
