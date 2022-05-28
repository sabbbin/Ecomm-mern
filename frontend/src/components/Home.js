import React, { useEffect, useState } from "react";
import MetaData from "./layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/product";
import Loader from "./layout/loader";
import Pagination from 'react-js-pagination'

import { ToastContainer, toast } from 'react-toastify';

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function Home() {
const [currentPage ,setCurrentPage]=useState(1)
let [price, setPrice]=useState([1,1000])
let [rating , setRating]= useState(0)

  const dispatch = useDispatch();

  const { isLoading, products, error ,resPerPage, productCount } = useSelector((state) => state.Products);
const { search, isSearch} = useSelector(state=>state.Search)


const [category ,setCategory]= useState('')
const categories=[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/shoes',
                'Beauty/Health',
                'Sports',
                'outdoors',
                'Home'
]


  useEffect(() => {
    dispatch(getProducts(search,currentPage,price,category,rating));


  }, [dispatch,currentPage,search,price, category,rating]);





  function setCurrentpageNo(pageNumber){
    setCurrentPage(pageNumber)
  }

  return (
      <>
    <ToastContainer />

    {isLoading? <Loader />:(

        <div className="container container-fluid">
      <MetaData title={"Buy Best Product Online"} />
      <h1 id="products_heading">Latest Product</h1>
      <div className="row " >
        


        <section id="products" className="container mt-5">
          <div className="row">

            {isSearch?(
              <>
              <div className="col-6 col-md-3 mt-5">
                <div className="px-5">
                <h4 className=" text-center mb-5">Price Range</h4>
                     
                  <Range 
                  marks={{
                    1:`$1`,
                    1000:`$1000`
                  }}
                  min={1}
                  max={1000}
                  defautlValue={[1,1000]}
                  tipFormatter={value=>`$${value}`}
                  tipProps={{
                    placement:'top',
                    visible:true
                  }}
                  step={10}
                  value={price}
                  onChange={price=>setPrice(price)}
                  
              

                  />


             
                </div>
                <hr className="mt-5" />
                <div className="mt-5 mb-3">
                  <h4 className=" text-center mb-4">Category</h4>
                   <ul className="">
                  {categories.map((cate,id)=>(
                    <li key={id}
                    style={{cursor:'pointer',
                    listStyleType:'none'
                   
                  }}
                  onClick={()=>setCategory(cate)}
                    >
                       {cate}
                    </li>
                  ))}

                   </ul>
                </div>
                <hr className="mt-5" />
                <div className="mt-5 mb-3">
                  <h4 className=" text-center mb-4">Ratings</h4>
                   <ul className="">
                  {[5,4,3,2,1].map((cate,id)=>(
                    <li key={id}
                    style={{cursor:'pointer',
                    listStyleType:'none'
                   
                  }}
                  onClick={()=>setRating(cate)}
                    >
                      <div className="rating-outer">
                        <div className="rating-inner" 
                        style={{width:`${cate*20}%`}}
                        >

                        </div>

                      </div>
                    </li>
                  ))}

                   </ul>
                </div>

              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                    {
                         products.map((product) => (
                          <Product key={product._id} product={product} col={4} />
                        ))
                    }
                </div>
              </div>
              </>

            ):(

            
              products.map((product) => (
                <Product key={product._id} product={product}  col={3}/>
              ))

            )}
           

          </div>
        </section>
          

      </div>
        <div className="d-flex justify-content-center mt-5">

            <Pagination 
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentpageNo}
            nextPageText={'Next'} 
            prevPageText={'Prev'}
            firstPageText={'first'}
            lastPageText={'last'}
            itemClass='page-item'
            linkClass="page-link"
            />
    
        </div>
    </div>
    )}
  </>
    
  );
}

export default Home;
