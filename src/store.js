import { createStore } from 'redux';
import sharedReducer from './reducers';

const store = createStore(sharedReducer);

export default store;
