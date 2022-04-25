import React from "react";
import products from "../products";
import Product from "../components/Product";

const HomeScreen = () => {
    return (
        <div className='row'>
            <h2>LATEST PRODUCT</h2>
            {products.map((product) => (
                <div className='col-sm-12 col-md-6 col-lg-4' key={product._id}>
                    <Product product={product} />
                </div>
            ))}
        </div>
    );
};

export default HomeScreen;
