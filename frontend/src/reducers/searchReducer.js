import React from 'react'
import {SEARCH_ACTION_TYPE} from '../actions/searchAction'


export const searchReducer = (state, action) => {

    switch(action.type){
        case SEARCH_ACTION_TYPE.SEARCH_KEYWORD:
            return {
              
                search:action.payload,
                isSearch:true
            }
        
        default:
            return {
                ...state
            }


    }
 
}

