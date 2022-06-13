import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

// This line is only used for testing front-end
// import products from "../resources/products";

const HomeScreen = () => {
    //Those lines are used to fetch products from DB to Frontend
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get("/api/products");
    //         setProducts(data);
    //     };
    //     fetchProducts();
    // }, []);
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            <h2>LATEST PRODUCT</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default HomeScreen;
