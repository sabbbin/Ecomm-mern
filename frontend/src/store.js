import { createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
 import {composeWithDevTools} from 'redux-devtools-extension'

 import { productsReducers } from './reducers/productsReducers'
 import {userReducer} from './reducers/userReducer';
const reducer= combineReducers({
    Products:productsReducers,
    User:userReducer
 
})

let initialState={
    Products:{
        products:[],
        product:{},
        isLoading:true,
        msg:''
    },
    User:{
        user:[],
        isLoading:true,
        msg:''
    }
     
}

const middleware=[thunk];
const store=createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;