import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  data: sampleReducer,
  token: tokenReducer,
  user: userReducer,
});

export default rootReducer;
