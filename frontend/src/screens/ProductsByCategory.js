import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import CategorySelector from "../components/CategorySelector";

import { listProductsCategory } from "../actions/productActions";

const ProductsByCategory = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const category = params.category;
    const pageNumber = params.pageNumber || 1;
    const productListCategory = useSelector(
        (state) => state.productListCategory
    );
    const { loading, error, products, page, pages } = productListCategory;
    useEffect(() => {
        dispatch(listProductsCategory(category, pageNumber));
    }, [dispatch, category, pageNumber]);

    console.log(category);
    return (
        <div>
            <h2 className='my-3'>PRODUCTS</h2>
            <CategorySelector />
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col sm={12} md={6} lg={4} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        page={page}
                        pages={pages}
                        category={category ? category : ""}
                    />
                </>
            )}
        </div>
    );
};

export default ProductsByCategory;
