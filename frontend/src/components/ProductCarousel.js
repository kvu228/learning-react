import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselItem, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel pause='hover' className='carousel carousel-dark'>
            {products.map((product) => (
                <CarouselItem key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            className='img-responsive center-block'
                        />
                        <Carousel.Caption className='carousel-caption'>
                            <h3>{product.name}</h3>
                            <p>{product.price}</p>
                        </Carousel.Caption>
                    </Link>
                </CarouselItem>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;
