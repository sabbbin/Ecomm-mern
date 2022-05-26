import axios from 'axios'

export const PRODUCT_ACTION_TYPE={
       PRODUCT_REQUEST:'PRODUCT_REQUEST',
       PRODUCT_SUCCESS:'PRODUCT_SUCCESS',
       PRODUCT_FAIL:'PRODUCT_FAIL',
       CLEAR_ERRORS:'CLEAR_ERRROS'
}

export const getProducts =()=>dispatch=>{
    

    dispatch({
        type:PRODUCT_ACTION_TYPE.PRODUCT_REQUEST
    })

  
    axios.get(process.env.REACT_APP_BASE_API_URL+'api/v1/products')
    .then((result)=>{
        console.log(result.data.data)
       setTimeout(() => {
           
           dispatch({
               type:PRODUCT_ACTION_TYPE.PRODUCT_SUCCESS,
               payload:result.data.data
           })
       }, 300);
    })
    .catch((err)=>{
       dispatch({
           type:PRODUCT_ACTION_TYPE.PRODUCT_FAIL,
           payload:err.response.data.message
       })
    })


}    

export const clearErrors= ()=>dispatch=>{
    dispatch({
        type:PRODUCT_ACTION_TYPE.CLEAR_ERRORS
    })
}