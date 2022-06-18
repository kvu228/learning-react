import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigate("/login");
        }
    }, [dispatch, userInfo, navigate]);

    return (
        <div>
            <h2 className='my-3'>Orders</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    className='table-sm align-middle'
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delieved</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAd}</td>
                                <td>$ {order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt
                                    ) : (
                                        <i
                                            className='fas fa-times'
                                            style={{ color: "red" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt
                                    ) : (
                                        <i
                                            className='fas fa-times'
                                            style={{ color: "red" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button
                                            variant='dark'
                                            className='btn-sm mx-auto'
                                        >
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default OrderListScreen;
