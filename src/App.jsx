import { Route, Router, Routes } from "react-router";
import "./App.css";
import Home from "./routes/Home";
import Catalog from "./routes/Catalog";
import Details from "./routes/Details";
import Create from "./routes/Create";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Edit from "./routes/Edit";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
			<Navbar></Navbar>
			
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/products/:id" element={<Details />} />

                <Route path="create" element={<Create />} />
                <Route path="/edit/:id" element={<Edit />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;
