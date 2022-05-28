export const SEARCH_ACTION_TYPE={
    SEARCH_KEYWORD:'SEARCH_KEYWORD'
}


export const searchProducts=(keyword)=>dispatch=>{

    return dispatch ({
        type:SEARCH_ACTION_TYPE.SEARCH_KEYWORD,
        payload:keyword
    })
}