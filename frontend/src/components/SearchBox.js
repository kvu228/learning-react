import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate("/");
        }
    };

    return (
        <Form onSubmit={submitHandler} style={{ display: "inline-flex" }}>
            <FormControl
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search product'
                className='mr-sm-2 ml-sm-5'
            ></FormControl>
            <Button type='submit' variant='outline-success' className='ms-1'>
                Seach
            </Button>
        </Form>
    );
};

export default SearchBox;
