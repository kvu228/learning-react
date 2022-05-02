import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    ListGroupItem,
} from "react-bootstrap";
import axios from "axios";

import Rating from "../components/Rating";
// import products from "../resources/products";

const ProductScreen = ({ match }) => {
    const productID = useParams().id;

    const [product, setProduct] = useState({});
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/product/${productID}`);
            setProduct(data);
        };
        fetchProduct();
    });

    // These lines are only used for testing front-end
    // const productID = useParams().id;
    // const product = products.find((product) => product._id === productID);

    return (
        <React.Fragment>
            <Link className='btn btn-dark my-3' to='/'>
                Go back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                            />
                        </ListGroupItem>
                        <ListGroupItem>Price: ${product.price}</ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price</Col>
                                    <Col>
                                        <strong> ${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>
                                        {product.countInStock > 0
                                            ? `${product.countInStock} in stock`
                                            : "Out of stock"}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    className='btn-dark'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add to card
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProductScreen;
