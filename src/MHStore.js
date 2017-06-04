import { compose, createStore, applyMiddleware } from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {AsyncStorage} from 'react-native'
import reducers from './reducers'

function configureStore() {
  const store = createStore(
    reducers,
    undefined,
    compose(
      applyMiddleware(thunk, createLogger()),
      autoRehydrate()
    )
  )
  persistStore(store, {storage: AsyncStorage, blacklist: ['nav', 'user']})
  return store
}


export default configureStore;