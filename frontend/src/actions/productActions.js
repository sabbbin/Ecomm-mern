import { http } from "../http.services"

export const PRODUCT_ACTION_TYPE={
       PRODUCT_REQUEST:'PRODUCT_REQUEST',
       PRODUCT_SUCCESS:'PRODUCT_SUCCESS',
       PRODUCT_FAIL:'PRODUCT_FAIL',
       PRODUCT_DETAILS:'PRODUCT_DETAILS',
       PRODUCT_SEARCH:'PRODUCT_SEARCH',
       CLEAR_ERRORS:'CLEAR_ERRROS'
}

export const getProducts =(keyword='',currentPage=1,price=[1,1000])=>dispatch=>{
    

    dispatch({
        type:PRODUCT_ACTION_TYPE.PRODUCT_REQUEST
    })

  
    http.getItem("api/v1/products")
    .then((result)=>{
          
       setTimeout(() => {
           
           dispatch({
               type:PRODUCT_ACTION_TYPE.PRODUCT_SUCCESS,
               payload:result.data.data,
               resPerPage:result.data.rowperpage,
               productCount:result.data.productCount
            
           })
       }, 300);
  
    })
    .catch((err)=>{
       dispatch({
           type:PRODUCT_ACTION_TYPE.PRODUCT_FAIL,
           payload:err.message
       })
    })


}  


export const searchProducts =(keyword='',currentPage=1,price=[1,1000])=>dispatch=>{
    

    dispatch({
        type:PRODUCT_ACTION_TYPE.PRODUCT_REQUEST
    })

  
    http.getItem(`api/v1/products?key=${keyword}&page=${currentPage}&price=${price[0]}-${price[1]}`)
    .then((result)=>{
           console.log('abc',result)
       setTimeout(() => {
           
           dispatch({
               type:PRODUCT_ACTION_TYPE.PRODUCT_SEARCH,
               payload:result.data.data,
               resPerPage:result.data.rowperpage,
               productCount:result.data.productCount,
               search:true
            
           })
       }, 300);
  
    })
    .catch((err)=>{
       dispatch({
           type:PRODUCT_ACTION_TYPE.PRODUCT_FAIL,
           payload:err.message
       })
    })


}  

export const detailProducts =(id)=>dispatch=>{
    

    dispatch({
        type:PRODUCT_ACTION_TYPE.PRODUCT_REQUEST
    })

  
    http.getItem(process.env.REACT_APP_BASE_API_URL+'api/v1/products/'+id)
    .then((result)=>{
 
       setTimeout(() => {
           
           dispatch({
               type:PRODUCT_ACTION_TYPE.PRODUCT_DETAILS,
               payload:result.data.data
           })
       }, 300);
    })
    .catch((err)=>{
      
       dispatch({
           type:PRODUCT_ACTION_TYPE.PRODUCT_FAIL,
           payload:err.message
       })
    })


}    


export const clearErrors= ()=>dispatch=>{
    dispatch({
        type:PRODUCT_ACTION_TYPE.CLEAR_ERRORS
    })
}