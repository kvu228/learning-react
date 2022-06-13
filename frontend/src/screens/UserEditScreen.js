import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Form,
    Button,
    FormGroup,
    FormLabel,
    FormControl,
    FormCheck,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
    const params = useParams();
    const navigate = useNavigate();

    const userID = params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate("/admin/userlist");
        } else {
            if (!user.name || user._id !== userID) {
                dispatch(getUserDetails(userID));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, dispatch, navigate, successUpdate, userID]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userID, name, email, isAdmin }));
    };

    return (
        <div>
            <Link to='/admin/userlist' className='btn btn-dark my-3'>
                Go back
            </Link>
            <FormContainer>
                <h2>Edit User</h2>
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

                        <FormGroup controlId='email'>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup controlId='isAdmin'>
                            <FormCheck
                                type='checkbox'
                                label='Is admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></FormCheck>
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

export default UserEditScreen;
