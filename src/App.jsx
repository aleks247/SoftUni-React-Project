import { Route, Router, Routes } from "react-router";
import Home from "./routes/home/Home";
import Catalog from "./routes/catalog/Catalog";
import Details from "./routes/productDetails/ProductDetails";
import Create from "./routes/Create";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Edit from "./routes/Edit";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Logout from "./auth/Logout";
import NotFound from "./routes/notFound/NotFound";
import Profile from "./routes/profile/Profile";
import { CartProvider } from "./contexts/CartContext";
import ProductDetails from "./routes/productDetails/ProductDetails";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(Object.values(data));
            })
            .catch((err) => alert(err.message));
    }, []);

    return (
        <>
            <AuthProvider>
                <CartProvider>
                    <Navbar></Navbar>

                    <Routes>
                        <Route
                            path="/"
                            element={<Home products={products} />}
                        />

                        <Route
                            path="/catalog"
                            element={
                                <Catalog
                                    products={products}
                                    gender={"unisex"}
                                />
                            }
                        />
                        <Route
                            path="/catalog/male"
                            element={
                                <Catalog products={products} gender={"male"} />
                            }
                        />
                        <Route
                            path="/catalog/female"
                            element={
                                <Catalog
                                    products={products}
                                    gender={"female"}
                                />
                            }
                        />

                        <Route path="/catalog/:id" element={<ProductDetails products={products} />} />
                        
                        {/* <Route path="/products/:id" element={<Details />} /> */}

                        <Route path="create" element={<Create />} />
                        <Route path="/edit/:id" element={<Edit />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />

                        <Route path="/profile" element={<Profile />} />

                        <Route path="/*" element={<NotFound />} />
                    </Routes>

                    <Footer />
                </CartProvider>
            </AuthProvider>
        </>
    );
}

export default App;
