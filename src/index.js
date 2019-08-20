import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import 'bootstrap/dist/css/bootstrap.min.css'
import reducers from './reducers'

import App from './components/App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const STORE = createStore(reducers, composeEnhancers(applyMiddleware(thunk,logger)))

ReactDOM.render(
    <Provider store={STORE}>
        <App/>
    </Provider>,
    document.getElementById('root')
    )

