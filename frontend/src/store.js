import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sharedReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['stories']
};

const persistedReducer = persistReducer(persistConfig, sharedReducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
