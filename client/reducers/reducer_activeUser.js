//the state below is not global state, just the local state -- cause you know.. redux 
export default function(state = [null], action) {
  //setting state to null if no book is selected at the start
  switch(action.type){
    //if action type is cardSelected do this
    case 'person':
      return [action.payload]
  }

  return state
}