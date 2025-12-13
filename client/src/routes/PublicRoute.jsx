import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = () => {
    const { user } = useAuth();
    console.log(user);
    
    // If logged in, redirect to profile (optional)
    if (user) {
        return <Navigate to="/" replace />;
    }

    // If NOT logged in, allow access
    return <Outlet />;
};

export default PublicRoute;
