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
const Range = createSliderWithTooltip(Slider.Range)

function Home() {
const [currentPage ,setCurrentPage]=useState(1)
let [price, setPrice]=useState([1,1000])


  const dispatch = useDispatch();

  const { isLoading, products, error ,resPerPage, productCount ,search } = useSelector((state) => state.Products);

 
  useEffect(() => {
    dispatch(getProducts());
    toast.success('welcome to home')

  }, []);



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
      <div className="row">
        


        <section id="products" className="container mt-5">
          <div className="row">

            {search?(
              <>
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
             
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
                  value={price}
                  onChange={price=>setPrice(price)}

                  />
             
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
    </div>
    )}
  </>
    
  );
}

export default Home;
