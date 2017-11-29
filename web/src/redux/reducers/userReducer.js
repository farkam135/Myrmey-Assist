const initialState = {
    user: false,
}

function userReducer (state = initialState, action) {
  switch(action.type){
    case 'TEST':
      return Object.assign({}, state, { 
        user: {
          myrmeyid: '1234',
          studentInfo: 'i love league',
          advice: 'go to school',
          courses: 'noobstomping 101',
        }, });
    default:
      return state;
  }
}

export default userReducer;