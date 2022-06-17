import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//Component
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentSceen";

import OrderScreen from "./screens/OrderScreen";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";

//Admin function screens
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <div className='container'>
                    <Routes>
                        <Route path='/orders/:id' element={<OrderScreen />} />
                        <Route
                            path='/placeorder'
                            element={<PlaceOrderScreen />}
                        />
                        <Route path='/payment' element={<PaymentScreen />} />
                        <Route path='/shipping' element={<ShippingScreen />} />

                        <Route path='/login' element={<LoginScreen />} />
                        <Route path='/register' element={<RegisterScreen />} />
                        <Route path='/profile' element={<ProfileScreen />} />

                        <Route path='/cart' element={<CartScreen />}>
                            <Route path=':id' element={<CartScreen />} />
                        </Route>

                        <Route
                            path='/admin/userlist'
                            element={<UserListScreen />}
                        />
                        <Route
                            path='/admin/user/:id/edit'
                            element={<UserEditScreen />}
                        />
                        <Route
                            path='/admin/productlist'
                            element={<ProductListScreen />}
                        />
                        <Route
                            path='/admin/products/:id/edit'
                            element={<ProductEditScreen />}
                        />

                        <Route
                            path='/products/:id'
                            element={<ProductScreen />}
                        />

                        <Route path='/' element={<HomeScreen />} exact />
                    </Routes>
                </div>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
