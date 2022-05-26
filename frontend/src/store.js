import { createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
 import {composeWithDevTools} from 'redux-devtools-extension'

 import { productsReducers } from './reducers/productsReducers'
const reducer= combineReducers({
    products:productsReducers
 
})

let initialState={
    products:{
        Products:[],
        isLoading:false,
        error:''
    }
     
}

const middleware=[thunk];
const store=createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;