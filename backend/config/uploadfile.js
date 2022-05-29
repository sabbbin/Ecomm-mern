const cloudinary= require('cloudinary')

const uploaditem=(img)=>{
        return new Promise((res,rej)=>{

        
       cloudinary.v2.uploader.upload(img,{
            folder:'avatars',
            width:150,
            crop:'scale'
          },(err,result)=>{
              if (err){
                 
                  rej(err)
                }
                else{
             
                  res(result)
              }
          })
        
      })
    }


    const deleteimg=(img)=>{
      return new Promise((res,rej)=>{

      
     cloudinary.v2.uploader.destroy(img,(err,result)=>{
            if (err){
               
                rej(err)
              }
              else{
           
                res(result)
            }
        })
      
    })
  }

module.exports={uploaditem, deleteimg}
