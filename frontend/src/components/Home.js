import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/product";
import Loader from "./layout/loader";

import { ToastContainer, toast } from 'react-toastify';


function Home() {
  const dispatch = useDispatch();

  const { isLoading, products, error } = useSelector((state) => state.Products);
 console.log('loading', isLoading)
  useEffect(() => {

    dispatch(getProducts());
    toast.success('welcome to home')
  }, [dispatch]);

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
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </section>
      </div>
    </div>
    )}
  </>
    
  );
}

export default Home;
