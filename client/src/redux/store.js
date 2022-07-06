import {legacy_createStore,combineReducers,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './auth/reducer';
import { blogReducer } from './blogs/reducer';

const rootReducer = combineReducers({
    blogs: blogReducer,
    auth: authReducer
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

export const store = legacy_createStore(rootReducer, enhancer);
