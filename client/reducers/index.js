import {combineReducers} from 'redux';
import Users from './reducer-users'
import ActiveCard from './reducer_activeCard'
import ActiveUser from './reducer_activeUser'
import selectRules from './reducer_rules'
import logOut from './reducer_logout'


const allReducers = combineReducers({
  Players: Users,
  activeCard: ActiveCard,
  activeUser: ActiveUser,
  rules: selectRules,
  loginSubmit: logOut
})


export default allReducers