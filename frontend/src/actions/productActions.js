import axios from 'axios'

export const PRODUCT_ACTION_TYPE={
       PRODUCT_REQUEST:'PRODUCT_REQUEST',
       PRODUCT_SUCCESS:'PRODUCT_SUCCESS',
       PRODUCT_FAIL:'PRODUCT_FAIL',
       CLEAR_ERRORS:'CLEAR_ERRROS'
}

export const getProducts =()=>disptch=>{

    disptch({
        type:PRODUCT_ACTION_TYPE.PRODUCT_REQUEST
    })
    axios.get(process.env.REACT_APP_BASE_API_URL+'api/v1/products')
    .then((result)=>{
       setTimeout(() => {
           
           disptch({
               type:PRODUCT_ACTION_TYPE.PRODUCT_SUCCESS,
               payload:result.data.data
           })
       }, 300);
    })
    .catch((err)=>{
       disptch({
           type:PRODUCT_ACTION_TYPE,
           payload:err.response.data.message
       })
    })


}    

export const clearErrors= ()=>disptch=>{
    disptch({
        type:PRODUCT_ACTION_TYPE.CLEAR_ERRORS
    })
}