import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'
import { detailProducts } from '../actions/productActions'
import Loader from './layout/loader'
const ProductDetail = () => {
    const dispatch =useDispatch()
    const param= useParams()
    let [quantity, setQuantity]= useState(0)

    const {isLoading, product}= useSelector(state=>state.Products)

    const handleQuantity=(e)=>{
      
        
            let temp=quantity
            if (e.target.name=='plus'  && quantity>-1 && quantity<product.stock){
              setQuantity(temp+1)   
            }
            else if (quantity>0 && e.target.name=='minus'){
                setQuantity(temp-1)
            }
        
    }

    useEffect(()=>{
        dispatch(detailProducts(param.id))
    },[dispatch])

  return (
      <>
      {isLoading ? <Loader />:(
          
    <div className="container container-fluid">
    <div className="row f-flex justify-content-around">
        {product && product.images && product.images.map((o,i)=>(
            <>
         
        <div key={i}  className="col-12 col-lg-5 img-fluid" id="product_image">
        
            <img src={o.public_id} alt="sdf" height="500" width="500" />
        </div>
            </>
         ))}

        <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product # {product._id}</p>

            <hr/>

            <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{
                                width:`${
                                    (product.rating/5)*100
                                }%`
                            }}>
                            </div>
                        </div>
                        
                </div>        
                                    <span id="no_of_reviews">Reviews {product.numOfReviews}</span>

            <hr/>

            <p id="product_price">$ {product.price}</p>
            <div className="stockCounter d-inline">
                <button className="btn btn-danger minus" 
                disabled={quantity==0}
                name='minus' onClick={handleQuantity}>-</button>

                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                <button className="btn btn-primary plus" name='plus' 
                disabled={quantity==product.stock}
                onClick={handleQuantity}>+</button>
            </div>
             <button type="button" id="cart_btn"
             disabled={quantity==0}
             className="btn btn-primary d-inline ml-4">Add to Cart</button>

            <hr/>

            <p>In stock: <span id="stock_status">{product.stock}</span></p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
            
            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                        Submit Your Review
            </button>
            


            <div className="row mt-2 mb-5">
                <div className="rating w-50">

                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <ul className="stars" >
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                        <li className="star"><i className="fa fa-star"></i></li>
                                    </ul>

                                    <textarea name="review" id="review" className="form-control mt-3">

                                    </textarea>

                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                    
        </div>
</div>
 
</div>
</div>
      )}
      </>

  )
}

export default ProductDetail