import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Form,
    Button,
    FormGroup,
    FormLabel,
    FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
    const params = useParams();
    const navigate = useNavigate();

    const productID = params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        load: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            console.log("successUpdate: " + successUpdate);
            navigate("/admin/productlist");
        } else {
            if (!product.name || product._id !== productID) {
                dispatch(listProductDetails(productID));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, navigate, product, productID, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productID,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            })
        );
    };

    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-dark my-3'>
                Go back
            </Link>
            <FormContainer>
                <h2>Edit Product</h2>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant='danger'>{errorUpdate}</Message>
                )}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
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

                        <FormGroup controlId='price'>
                            <FormLabel>Price</FormLabel>
                            <FormControl
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup controlId='image'>
                            <FormLabel>Image</FormLabel>
                            <FormControl
                                type='textfield'
                                placeholder='Enter image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup controlId='brand'>
                            <FormLabel>Brand</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup controlId='countInStock'>
                            <FormLabel>Count in Stock</FormLabel>
                            <FormControl
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                            ></FormControl>
                        </FormGroup>

                        <FormGroup controlId='category'>
                            <FormLabel>Category</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup controlId='description'>
                            <FormLabel>Description</FormLabel>
                            <FormControl
                                type='textfield'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <Button type='submit' className='btn-dark my-3'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
};

export default ProductEditScreen;
