import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import Product from "../components/Product";

// This line is only used for testing front-end
// import products from "../resources/products";

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("/api/products");
            setProducts(data);
        };
        fetchProducts();
    }, []);
    return (
        <Row>
            <h2>LATEST PRODUCT</h2>
            {products.map((product) => (
                <Col sm={12} md={6} lg={4} key={product._id}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default HomeScreen;
