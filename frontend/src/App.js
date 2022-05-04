import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<HomeScreen />} exact />
                        <Route
                            path='products/:id'
                            element={<ProductScreen />}
                        />
                    </Routes>
                </div>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
