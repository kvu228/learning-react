import React from "react";
import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <div className='card my-3 p-3 rounded'>
            <a href={`/product/${product._id}`}>
                <img
                    // src={product.image}
                    src='/images/airpods.jpg'
                    alt='pro-shop'
                    className='card-img-top'
                />
            </a>
            <div className='card-body'>
                <a
                    href={`/product/${product._id}`}
                    className='text-decoration-none'
                >
                    <p className='card-title display-7 text-black'>
                        <strong>{product.name}</strong>
                    </p>
                </a>
                {/* <div className='card-text'>
                    {product.rating} from {product.numReviews}
                </div> */}
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
