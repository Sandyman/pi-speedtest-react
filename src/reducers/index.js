import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  data: sampleReducer,
  user: userReducer,
});

export default rootReducer;
