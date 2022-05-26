import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/product";
import Loader from "./layout/loader";

function Home() {
  const disptch = useDispatch();

  const { loading, Products, error } = useSelector((state) => state.products);

  useEffect(() => {

    disptch(getProducts());
  }, [disptch]);

  return (
      <>
    
    {loading? <Loader />:(

        <div className="container container-fluid">
      <MetaData title={"Buy Best Product Online"} />
      <h1 id="products_heading">Latest Product</h1>
      <div className="row">
        <section id="products" className="container mt-5">
          <div className="row">
            {Products &&
              Products.map((product) => (
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
