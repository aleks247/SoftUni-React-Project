import { useState } from "react";
import { Link, useLocation } from "react-router";
import styles from "./Navbar.module.css";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const getLinkClass = (path) => {
        return location.pathname === path
            ? styles["linkActive"]
            : styles["link"];
    };

    return (
        <div className={styles["container"]}>
            <nav className={styles["navbar"]}>
                <Link to="/" className={styles["brand"]}>
                    MODA.
                </Link>

                <button
                    className={styles["hamburger"]}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div
                    className={`${styles["navLinks"]} ${
                        isMenuOpen ? styles["menuOpen"] : ""
                    }`}
                >
                    <Link to="/" className={getLinkClass("/")}>
                        Home
                    </Link>
                    <Link to="/catalog" className={getLinkClass("/catalog")}>
                        Catalog
                    </Link>
                    <Link to="/catalog/male" className={getLinkClass("/catalog/male")}>
                        Men
                    </Link>
                    <Link to="/catalog/female" className={getLinkClass("/catalog/fe male")}>
                        Women
                    </Link>
                    {!isAuthenticated && <Link to="/login" className={getLinkClass("/login")}>Login</Link>}
                    {isAuthenticated && <Link to="/logout" className={getLinkClass("/logout") + " " + styles['logout-link']}>&#8678;Logout</Link>}
                </div>
            </nav>
        </div>
    );
}
