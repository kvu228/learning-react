import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    ListGroupItem,
    Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import {
    getOrderDetails,
    payOrder,
    deliverOrder,
} from "../actions/orderActions";

//Import package for Paypal
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { CART_RESET_METHOD } from "../constants/cartConstants";

const OrderScreen = () => {
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);

    const params = useParams();
    const orderID = params.id;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    if (!loading) {
        // Calculate Items Price
        order.itemsPrice = order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
        );
    }

    useEffect(() => {
        if (!userInfo) {
            navigator("/login");
        }

        const addPayPalScript = async () => {
            const { data: clientID } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderID));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
        console.log(sdkReady);
    }, [
        dispatch,
        orderID,
        successPay,
        order,
        sdkReady,
        successDeliver,
        userInfo,
    ]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderID, paymentResult));
        dispatch({ type: CART_RESET_METHOD });
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(orderID));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <React.Fragment>
            <h2 className='my-3'>Order ID: {order._id}</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong> Name: {order.user.name}</strong>
                            </p>
                            <p>
                                <strong> Email: </strong>
                                <a href={`mailto"${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>

                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},{" "}
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.postCode},{" "}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>
                                    Not deleivered
                                </Message>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>Not paid</Message>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/products/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} * ${item.price} =
                                                    $
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroupItem>
                            )}

                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListGroupItem>
                                        {loadingDeliver && <Loader />}
                                        <Button
                                            type='button'
                                            className='btn btn-sm'
                                            variant='dark'
                                            onClick={deliverHandler}
                                        >
                                            Mark as Delivered
                                        </Button>
                                    </ListGroupItem>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default OrderScreen;
