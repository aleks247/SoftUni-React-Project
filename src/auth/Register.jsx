import { useState } from "react";
import { Link } from "react-router"; // Don't forget to import Link
import { useAuth } from "../contexts/AuthContext";
import styles from "./Auth.module.css"; // Uses the shared Auth styles

export default function Register() {
    const { registerSubmitHandler } = useAuth();
    
    // Using a single state object for all inputs is cleaner
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChangeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        registerSubmitHandler(formValues);
    };

    return (
        <div className={styles['container']}>
            {/* Left Side: Image */}
            <div className={styles['imageSection']}>
                <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" 
                    alt="Fashion Model" 
                    className={styles['authImage']} 
                />
                <div className={styles['imageOverlay']}></div>
            </div>

            {/* Right Side: Form */}
            <div className={styles['formSection']}>
                <h1 className={styles['title']}>Create Account</h1>
                <p className={styles['subtitle']}>Join us for exclusive access to new drops.</p>

                <form className={styles['form']} onSubmit={onSubmit}>
                    
                    {/* Email Input */}
                    <div className={styles['inputGroup']}>
                        <label htmlFor="email" className={styles['label']}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="maria@email.com"
                            value={formValues.email}
                            onChange={onChangeHandler}
                            className={styles['input']}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className={styles['inputGroup']}>
                        <label htmlFor="register-password" className={styles['label']}>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="register-password"
                            value={formValues.password}
                            onChange={onChangeHandler}
                            className={styles['input']}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className={styles['inputGroup']}>
                        <label htmlFor="confirm-password" className={styles['label']}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirm-password"
                            value={formValues.confirmPassword}
                            onChange={onChangeHandler}
                            className={styles['input']}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className={styles['submitBtn']}>
                        Register
                    </button>
                </form>

                <p className={styles['switchText']}>
                    Already have a profile? 
                    <Link to="/login" className={styles['switchLink']}>Sign in here</Link>
                </p>
            </div>
        </div>
    );
}