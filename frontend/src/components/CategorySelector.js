import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { listCategories } from "../actions/categoryActions";

const CategorySelector = () => {
    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { success, categories } = categoryList;

    useEffect(() => {
        if (!success) {
            dispatch(listCategories());
        }
    }, [dispatch, success]);

    console.log(categories.map((x) => x + 1));

    return (
        <Dropdown className='my-3'>
            <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                Select Category
            </Dropdown.Toggle>

            <DropdownMenu>
                {categories.map((x) => (
                    <LinkContainer key={x} to={`/products/category/${x}`}>
                        <Dropdown.Item>{x}</Dropdown.Item>
                    </LinkContainer>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default CategorySelector;
