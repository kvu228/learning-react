import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    productListReducer,
    productListCategoryReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewReducer,
    productTopRatedReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderMyListReducer,
    orderListReducer,
    orderDeliverReducer,
} from "./reducers/orderReducer";

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from "./reducers/userReducers";

import { categoryListReducer } from "./reducers/categoryReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productListCategory: productListCategoryReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    categoryList: categoryListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleWare = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
