import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Catalog.module.css";

export default function Catalog({ products, gender }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (gender === "male") {
            setFilteredProducts(
                products.filter(
                    (product) =>
                        product.gender == "male" || product.gender == "unisex"
                )
            );
        } else if (gender === "female") {
            setFilteredProducts(
                products.filter(
                    (product) =>
                        product.gender == "female" || product.gender == "unisex"
                )
            );
        } else {
            setFilteredProducts(products);
        }
    }, [gender, products]);

    
    return (
        <div className={styles["container"]}>
            <div
                className={`overlay ${isSidebarOpen ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <div className={styles["header"]}>
                <div className={styles["searchGroup"]}>
                    <button
                        className={styles["mobileFilterBtn"]}
                        onClick={() => setSidebarOpen(true)}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="4" y1="21" x2="4" y2="14"></line>
                            <line x1="4" y1="10" x2="4" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="3"></line>
                            <line x1="20" y1="21" x2="20" y2="16"></line>
                            <line x1="20" y1="12" x2="20" y2="3"></line>
                            <line x1="1" y1="14" x2="7" y2="14"></line>
                            <line x1="9" y1="8" x2="15" y2="8"></line>
                            <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg>
                        Filters
                    </button>
                    <div className={styles["searchBox"]}>
                        <input
                            type="text"
                            placeholder="Search jackets, jeans, tees..."
                            className={styles["searchInput"]}
                        />
                        <svg
                            className={styles["searchIcon"]}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                </div>

                <div className={styles["sortOptions"]}>
                    <span style={{ fontSize: "13px", color: "#888" }}>
                        Sort by:
                    </span>
                    <button className={styles["sortBtnActive"]}>Newest</button>
                    <button className={styles["sortBtn"]}>
                        Price Low-High
                    </button>
                    <button className={styles["sortBtn"]}>Popularity</button>
                </div>
            </div>

            <div className={styles["contentWrapper"]}>
                <aside
                    className={`${styles["sidebar"]} ${
                        isSidebarOpen ? styles["active"] : ""
                    }`}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "20px",
                        }}
                        className="mobile-only"
                    >
                        {isSidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(false)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "24px",
                                    cursor: "pointer",
                                }}
                            >
                                &times;
                            </button>
                        )}
                    </div>

                    <div className={styles["section"]}>
                        <div className={styles["sectionTitle"]}>Category</div>
                        <label className={styles["filterRow"]}>
                            <span className={styles["checkboxWrapper"]}>
                                <input type="checkbox" defaultChecked />
                                <span
                                    className={styles["checkboxCustom"]}
                                ></span>
                            </span>
                            <span className={styles["filterLabel"]}>
                                All Clothing
                            </span>
                            <span className={styles["filterCount"]}>320</span>
                        </label>
                        <label className={styles["filterRow"]}>
                            <span className={styles["checkboxWrapper"]}>
                                <input type="checkbox" />
                                <span
                                    className={styles["checkboxCustom"]}
                                ></span>
                            </span>
                            <span className={styles["filterLabel"]}>
                                Outerwear
                            </span>
                            <span className={styles["filterCount"]}>45</span>
                        </label>
                        <label className={styles["filterRow"]}>
                            <span className={styles["checkboxWrapper"]}>
                                <input type="checkbox" />
                                <span
                                    className={styles["checkboxCustom"]}
                                ></span>
                            </span>
                            <span className={styles["filterLabel"]}>
                                T-Shirts
                            </span>
                            <span className={styles["filterCount"]}>112</span>
                        </label>
                    </div>

                    <div className={styles["section"]}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "15px",
                            }}
                        >
                            <span
                                className={styles["sectionTitle"]}
                                style={{ marginBottom: 0 }}
                            >
                                Price
                            </span>
                            <span style={{ fontSize: "13px", color: "#666" }}>
                                $0 - $250
                            </span>
                        </div>
                        <input type="range" className={styles["slider"]} />
                    </div>

                    <div className={styles["section"]}>
                        <div className={styles["sectionTitle"]}>Size</div>
                        <label className={styles["filterRow"]}>
                            <span className={styles["checkboxWrapper"]}>
                                <input type="checkbox" defaultChecked />
                                <span
                                    className={styles["checkboxCustom"]}
                                ></span>
                            </span>
                            <span className={styles["filterLabel"]}>
                                Small (S)
                            </span>
                        </label>
                        <label className={styles["filterRow"]}>
                            <span className={styles["checkboxWrapper"]}>
                                <input type="checkbox" defaultChecked />
                                <span
                                    className={styles["checkboxCustom"]}
                                ></span>
                            </span>
                            <span className={styles["filterLabel"]}>
                                Medium (M)
                            </span>
                        </label>
                    </div>
                </aside>
                {filteredProducts.length == 0 ? (
                    <h2 className={styles['no-products']} > No products found</h2>
                ) : (
                    <div className={styles["grid"]}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        {/* Creating more cards */}
                        {/* {filteredProducts.map((product) => (
                        <ProductCard
                        key={`copy-${product.id}`}
                        product={product}
                        />
                        ))} */}
                    </div>
                )}
            </div>
        </div>
    );
}
