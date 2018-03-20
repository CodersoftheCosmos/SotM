import {combineReducers} from 'redux';
import Users from './reducer-users'
import ActiveCard from './reducer_activeCard'
import ActiveUser from './reducer_activeUser'


const allReducers = combineReducers({
  Players: Users,
  activeCard: ActiveCard,
  activeUser: ActiveUser
})


export default allReducers