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
    FormGroup,
    FormLabel,
    FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
// import axios from "axios";

import Rating from "../components/Rating";
// import products from "../resources/products";
import {
    listProductDetails,
    createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

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
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productCreateReview = useSelector(
        (state) => state.productCreateReview
    );
    const { error: errorProductReview, success: successProductReview } =
        productCreateReview;

    useEffect(() => {
        if (successProductReview) {
            alert("Review submitted");
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(productID));
    }, [dispatch, productID, successProductReview]);

    const addToCartHandler = (e) => {
        e.preventDefault();
        navigate(`/cart/${productID}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(productID, { rating, comment }));
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
                <>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
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
                                                <strong>
                                                    {" "}
                                                    ${product.price}
                                                </strong>
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
                                                            setQty(
                                                                e.target.value
                                                            )
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
                                            disabled={
                                                product.countInStock === 0
                                            }
                                            onClick={addToCartHandler}
                                        >
                                            Add to card
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h3>Reviews</h3>
                            {product.review.length === 0 && (
                                <Message>No reviews</Message>
                            )}
                            <ListGroup variant='flush'>
                                {product.review.map((review) => (
                                    <ListGroupItem key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt}</p>
                                        <p>{review.comment}</p>
                                    </ListGroupItem>
                                ))}
                                <ListGroupItem>
                                    <h3>Write Review</h3>
                                    {errorProductReview && (
                                        <Message variant='danger'>
                                            {errorProductReview}
                                        </Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <FormGroup controlId='rating'>
                                                <FormLabel>Rating</FormLabel>
                                                <FormControl
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value=''>
                                                        Select
                                                    </option>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>4</option>
                                                    <option value='5'>5</option>
                                                </FormControl>
                                            </FormGroup>
                                            <FormGroup controlId='comment'>
                                                <FormLabel>Comment</FormLabel>
                                                <FormControl
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></FormControl>
                                                <Button
                                                    type='submit'
                                                    variant='dark'
                                                    className='my-3'
                                                >
                                                    Submit
                                                </Button>
                                            </FormGroup>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please{" "}
                                            <Link to='/login'>sign in</Link> to
                                            write a review
                                        </Message>
                                    )}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </React.Fragment>
    );
};

export default ProductScreen;
