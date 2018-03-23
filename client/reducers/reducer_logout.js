export default function(state = null, action) {
  //setting state to null if no book is selected at the start
  switch(action.type){
    //if action type is cardSelected do this
    case 'logout':
      return { logout: action.payload }
  }

  return state
}