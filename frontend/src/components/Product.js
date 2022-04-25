import React from "react";

const Product = ({ product }) => {
    return (
        <div className='card my-3 p-3 rounded'>
            <a href={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt='pro-shop'
                    className='card-img-top'
                />
            </a>
            <div className='card-body'>
                <a href={`/product/${product._id}`}>
                    <h3 className='card-title '>
                        <strong>{product.name}</strong>
                    </h3>
                </a>
                <div className='card-text'>
                    {product.rating} from {product.numReviews}
                </div>
                <h3 className='card-text'>
                    <strong>$ {product.price}</strong>
                </h3>
            </div>
        </div>
    );
};

export default Product;
