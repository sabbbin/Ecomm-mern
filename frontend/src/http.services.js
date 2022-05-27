import axios from 'axios'


const getHeaders = () => {
    const headers = {
        "content-type": "application/json"
    }
    return headers;
}


const axiosRequest=axios.create({
    baseURL:process.env.REACT_APP_BASE_API_URL,
    responseType:'json',
    timeout:400000,
    timeoutErrorMessage:'Request timed out',
  
    

})

 const getItem=(url,is_strict=false)=>{
    
    let config = getHeaders();
    if (is_strict){
        config['authorization'] ='abc'
     }
     return axiosRequest.get(url,config)
     
}

 const postItem=(url, data, is_strict=false,is_form=false)=>{
    let config = getHeaders();
    if (is_strict){
        config['authorization'] ='abc'
    }
    if (is_form){
        config['content-type']='multipart/form-data'
    }
   
    return axiosRequest.post(url,data,config)
}

const updateItem=(url, data,is_strict=false,is_form=false)=>
            {
                let config = getHeaders();
                if (is_strict){
                    config['authorization'] ='abc'
                }
                if (is_form){
                    config['content-type']='multipart/form-data'
                }
               
                return axiosRequest.put(url,data,config)
            }


const deleteItem=(url,is_strict=false)=>{
    let config = getHeaders();
    if (is_strict){
        config['authorization'] ='abc'
    }
    return axiosRequest.delete(url)
}


// const uploadItem=(method,url, data,files, is_strict=true)=>{
//    return new Promise((res,rej)=>{
//        let xhr= new XMLHttpRequest()
//        let form_data= new FormData()
      
//        if (files&& files.length>0){
//            files.map((o)=>{
//              form_data.append('image',o)
//            })
//        }
//        for (let key in data){
//            console.log(key ,data[key])
//            form_data.append(key,data[key])
//            console.log('form', form_data)
//        }
//       xhr.onreadystatechange=()=>{
//           if (xhr.readyState==4){
//               console.log(xhr)
//           }
//       }
   
//       xhr.open(method, process.env.REACT_APP_BASE_API_URL+url);
//       if (is_strict){
//           xhr.setRequestHeader('authoriztion' ,'abc')
//       }
//       xhr.send(form_data)

//    })

// }

export const http={
    getItem,
    postItem,
    updateItem,
    deleteItem

}