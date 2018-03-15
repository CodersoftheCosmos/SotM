import {combineReducers} from 'redux';
import Users from './reducer-users'


const allReducers = combineReducers({
  users: Users
})


export default allReducers