import { createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
 import {composeWithDevTools} from 'redux-devtools-extension'

 import { productsReducers } from './reducers/productsReducers'
 import {userReducer} from './reducers/userReducer';
import { searchReducer } from './reducers/searchReducer.js';

const reducer= combineReducers({
    Products:productsReducers,
    User:userReducer,
    Search:searchReducer
 
})

let initialState={
    Products:{
        products:[],
        product:{},
        isLoading:true,
        msg:'',
     
        resPerPage:0,
        productCount:0
    },
    User:{
        user:{},
        isLoading:true,
        msg:'',
        status:false
    },
    Search:{
        search:'',
        isSearch:''
    }
     
}

const middleware=[thunk];
const store=createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;