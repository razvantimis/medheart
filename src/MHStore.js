import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers'

function configureStore() {
  const store = createStore(
    reducers ,
    undefined,
    applyMiddleware(thunk, createLogger())
  )
  return store
}

export default configureStore;