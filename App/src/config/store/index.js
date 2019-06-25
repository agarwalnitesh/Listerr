
import {
  createStore, applyMiddleware, combineReducers, compose
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from './ApplicationReducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

/**
 * Create a store with thunk middleware. And add reducers to it.
 */

const middlewares = [thunk];
if (__DEV__) {
  middlewares.push(logger);
}

const reducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['DashboardReducer', 'SignupReducer']
};
const pReducer = persistReducer(persistConfig, reducer);

export let store; let
  persistor;

const configureStore = async () => new Promise((resolve, reject) => {
  try {
    store = createStore(pReducer, {}, compose(
      applyMiddleware(...middlewares),
    ));
    persistor = persistStore(store, {},
      () => resolve({ store, persistor }));
  } catch (err) {
    reject(err);
  }
});

export default configureStore;
