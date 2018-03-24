import {combineReducers} from 'redux';
import Users from './reducer-users'
import ActiveCard from './reducer_activeCard'
import ActiveUser from './reducer_activeUser'
import selectRules from './reducer_rules'



const allReducers = combineReducers({
  Players: Users,
  activeCard: ActiveCard,
  activeUser: ActiveUser,
  rules: selectRules,
})


export default allReducers