import { Route, Router, Routes } from "react-router";
import Home from "./routes/home/Home";
import Catalog from "./routes/catalog/Catalog";
import Details from "./routes/Details";
import Create from "./routes/Create";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Edit from "./routes/Edit";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() =>  {
        fetch("http://localhost:3030/jsonstore/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(Object.values(data));
            })
            .catch((err) => alert(err.message));
    }, []);
    
    return (
        <>
            <Navbar></Navbar>

            <Routes>
                <Route path="/" element={<Home products={products}/>} />

                <Route path="/catalog" element={<Catalog products={products} gender={"unisex"}/>} />
                <Route path="/catalog/male" element={<Catalog products={products} gender={"male"}/>} />
                <Route path="/catalog/female" element={<Catalog products={products} gender={"female"}/>} />
                
                <Route path="/products/:id" element={<Details />} />

                <Route path="create" element={<Create />} />
                <Route path="/edit/:id" element={<Edit />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
