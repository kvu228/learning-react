import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <div className='container'>
                    <Routes>
                        <Route path='/login' element={<LoginScreen />} />
                        <Route path='/register' element={<RegisterScreen />} />
                        <Route path='/profile' element={<ProfileScreen />} />
                        <Route
                            path='/products/:id'
                            element={<ProductScreen />}
                        />
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
                        <Route path='/' element={<HomeScreen />} exact />
                    </Routes>
                </div>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
