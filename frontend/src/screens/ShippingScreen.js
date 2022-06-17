import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = () => {
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postCode, setPostCode] = useState(shippingAddress.postCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postCode, country }));
        navigate("/payment");
    };
    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h2 className='my-3'>Shipping</h2>
            <Form onSubmit={submitHandler}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>

                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter City'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>

                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Postal Code'
                    value={postCode}
                    required
                    onChange={(e) => setPostCode(e.target.value)}
                ></Form.Control>

                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Country'
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>

                <Button type='submit' variant='dark' className='my-3'>
                    Next
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
