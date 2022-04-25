import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
    return (
        <React.Fragment>
            <Header />
            <main>
                <div className='container'>
                    <HomeScreen />
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default App;
