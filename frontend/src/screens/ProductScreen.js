import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    ListGroupItem,
    Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

import Rating from "../components/Rating";
// import products from "../resources/products";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = () => {
    const productID = useParams().id;
    const navigate = useNavigate();

    //Those lines are used to fetch product details from DB to front-end
    // const [product, setProduct] = useState({});
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const { data } = await axios.get(`/api/products/${productID}`);
    //         setProduct(data);
    //     };
    //     fetchProduct();
    // });

    // These lines are only used for testing front-end
    // const productID = useParams().id;
    // const product = products.find((product) => product._id === productID);

    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    useEffect(() => {
        dispatch(listProductDetails(productID));
    }, [dispatch, productID]);

    const addToCartHandler = (e) => {
        e.preventDefault();
        navigate(`/cart/${productID}?qty=${qty}`);
    };

    return (
        <React.Fragment>
            <Link className='btn btn-dark my-3' to='/'>
                Go back
            </Link>
            {loading ? (
                <h2>loading...</h2>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
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
                            <ListGroupItem>
                                Price: ${product.price}
                            </ListGroupItem>
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

                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}

                                <ListGroupItem>
                                    <Button
                                        className='btn-dark'
                                        type='button'
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >
                                        Add to card
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </React.Fragment>
    );
};

export default ProductScreen;
