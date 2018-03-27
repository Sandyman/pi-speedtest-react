import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import statsReducer from './statsReducer';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  data: sampleReducer,
  stats: statsReducer,
  token: tokenReducer,
  user: userReducer,
});

export default rootReducer;
