import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import * as request from '../utils/request';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const email = localStorage.getItem('email');
        const _id = localStorage.getItem('_id');
        
        if (token) {
            setAuth({ accessToken: token, email, _id });
        }
    }, []);

    const loginSubmitHandler = async (values) => {
        try {
            const result = await request.post('http://localhost:3030/users/login', values);

            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('email', result.email);
            localStorage.setItem('_id', result._id);

            navigate('/'); 
        } catch (error) {
            alert(error.message);
        }
    };

    const registerSubmitHandler = async (values) => {
        if (values.password !== values.confirmPassword) {
             return alert("Passwords don't match!");
        }

        try {
            const result = await request.post('http://localhost:3030/users/register', values);

            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('email', result.email);
            localStorage.setItem('_id', result._id);

            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    const logoutHandler = async () => {
        try {
            await request.get('http://localhost:3030/users/logout');
        } catch (error) {
            console.log("Logout failed (server might be down), clearing local state anyway");
        }
        
        setAuth({});
        localStorage.clear();
        navigate('/');
    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        user: auth,
        userId: auth._id,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};