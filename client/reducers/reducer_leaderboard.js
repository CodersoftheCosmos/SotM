export default function(state = null, action) {
  switch(action.type){
    case 'board':
      return action.payload
  }

  return state
}