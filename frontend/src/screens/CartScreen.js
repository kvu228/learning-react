import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroupItem,
    ListGroup,
    Form,
    Image,
    Button,
    Card,
    Alert,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
    const productID = useParams().id;
    const location = useLocation().search;
    const navigate = useNavigate();
    const qty = location ? Number(location.split("=")[1]) : 1;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty));
        }
    }, [dispatch, productID, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkOutHandler = () => {
        navigate("/login?redirect=shipping");
    };

    return (
        <Row>
            <Col md={8}>
                <h2 className='my-3'>Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <Alert>
                        Your cart is empty <Link to='/'>Go back</Link>
                    </Alert>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>{item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
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
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <b>{item.qty * item.price}</b>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card className='my-3'>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h4>
                                Subtotal (
                                {cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0
                                )}
                                ) items
                            </h4>
                            $
                            {cartItems.reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                            )}
                        </ListGroupItem>
                        <Button
                            type='button'
                            className='btn-dark'
                            disabled={cartItems.length === 0}
                            onClick={checkOutHandler}
                        >
                            Check out
                        </Button>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
