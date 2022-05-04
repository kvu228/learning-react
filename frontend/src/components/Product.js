import React from "react";
import Rating from "./Rating";

import { Link } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <div className='card my-3 p-3 rounded'>
            <Link to={`/products/${product._id}`}>
                <img
                    src={product.image}
                    alt='pro-shop'
                    className='card-img-top'
                />
            </Link>
            <div className='card-body'>
                <Link
                    to={`/products/${product._id}`}
                    className='text-decoration-none'
                >
                    <p className='card-title display-7 text-black'>
                        <strong>{product.name}</strong>
                    </p>
                </Link>

                <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                />
                <h3 className='card-text'>
                    <strong>$ {product.price}</strong>
                </h3>
            </div>
        </div>
    );
};

export default Product;
