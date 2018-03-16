import {combineReducers} from 'redux';
import Users from './reducer-users'
import ActiveCard from './reducer_activeCard'


const allReducers = combineReducers({
  Players: Users,
  activeCard: ActiveCard
})


export default allReducers