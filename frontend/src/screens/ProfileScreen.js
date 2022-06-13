import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Form,
    Button,
    Row,
    Col,
    FormGroup,
    FormLabel,
    FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";

const ProfileScreen = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!user.name) {
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, user, userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password does not match!");
        } else {
            dispatch(
                updateUserProfile({ id: user._id, name, email, password })
            );
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h3>Profile</h3>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && (
                    <Message variant='success'>
                        Profile Updated successfully
                    </Message>
                )}
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Full Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='email'>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='confirmPassword'>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <Button type='submit' className='btn-dark my-3'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h3>My Orders</h3>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
