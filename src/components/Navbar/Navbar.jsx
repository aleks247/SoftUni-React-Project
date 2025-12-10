import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import styles from "./Navbar.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const location = useLocation();
    const { isAuthenticated, logoutHandler } = useAuth();
    const { cart, removeFromCart, clearCart, cartTotal, cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getLinkClass = (path) => {
        return location.pathname === path
            ? styles["linkActive"]
            : styles["link"];
    };

    const handleBuy = () => {
        if (cart.length === 0) return;
        if (window.confirm(`Purchase total: $${cartTotal.toFixed(2)}?`)) {
            clearCart();
            setIsCartOpen(false);
            alert("Thank you for your purchase!");
        }
    };

    return (
        <div
            className={`${styles["container"]} ${
                scrolled ? styles["scrolled"] : ""
            }`}
        >
            <nav className={styles["navbar"]}>
                <Link to="/" className={styles["brand"]}>
                    MODA.
                </Link>

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
                    <Link to="/catalog/male" className={styles["link"]}>
                        Men
                    </Link>
                    <Link to="/catalog/female" className={styles["link"]}>
                        Women
                    </Link>

                    {/* Auth */}
                    {!isAuthenticated ? (
                        <Link to="/login" className={getLinkClass("/login")}>
                            Login
                        </Link>
                    ) : (
                        <div className={styles["dropdown"]}>
                            {/* Profile Trigger with Icon */}
                            <Link
                                to="/profile"
                                className={styles["profileTrigger"]}
                            >
                                <svg
                                    className={styles["userIcon"]}
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="none"
                                >
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                {localStorage.getItem("email")?.split("@")[0] ||
                                    "Profile"}
                                <span
                                    style={{
                                        fontSize: "10px",
                                        marginLeft: "2px",
                                    }}
                                >
                                    &#9662;
                                </span>
                            </Link>

                            <div className={styles["dropdownMenu"]}>
                                <Link
                                    to="/profile"
                                    className={styles["dropdownItem"]}
                                >
                                    Settings
                                </Link>
                                <Link
                                    to="/profile"
                                    className={styles["dropdownItem"]}
                                >
                                    Orders
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className={styles["dropdownItem"]}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT ACTIONS (Cart + Hamburger) */}
                <div className={styles["navActions"]}>
                    <div
                        className={styles["cartWrapper"]}
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <svg
                            className={styles["cartIcon"]}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>

                        {cartCount > 0 && (
                            <span className={styles["cartBadge"]}>
                                {cartCount}
                            </span>
                        )}

                        {isCartOpen && (
                            <div
                                className={styles["miniCart"]}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className={styles["cartHeader"]}>
                                    <span>Your Bag</span>
                                    <span
                                        style={{
                                            fontWeight: 400,
                                            fontSize: "13px",
                                        }}
                                    >
                                        ({cartCount} items)
                                    </span>
                                </div>

                                <div className={styles["cartItems"]}>
                                    {cart.length === 0 ? (
                                        <p
                                            style={{
                                                textAlign: "center",
                                                color: "#999",
                                                padding: "20px",
                                            }}
                                        >
                                            Empty
                                        </p>
                                    ) : (
                                        cart.map((item) => (
                                            <div
                                                key={item.id}
                                                className={styles["cartItem"]}
                                            >
                                                <img
                                                    src={
                                                        item.image ||
                                                        "https://via.placeholder.com/50"
                                                    }
                                                    alt="Thumb"
                                                    className={
                                                        styles["itemThumb"]
                                                    }
                                                />
                                                <div
                                                    className={
                                                        styles["itemDetails"]
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles["itemName"]
                                                        }
                                                    >
                                                        {item.name}
                                                    </span>
                                                    <span
                                                        className={
                                                            styles["itemPrice"]
                                                        }
                                                    >
                                                        ${item.price} x{" "}
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <button
                                                    className={
                                                        styles["removeBtn"]
                                                    }
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className={styles["cartFooter"]}>
                                    <div className={styles["totalRow"]}>
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <button
                                        className={styles["checkoutBtn"]}
                                        onClick={handleBuy}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        className={styles["hamburger"]}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
