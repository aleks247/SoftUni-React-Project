import { useEffect, useState } from "react";
import { Link } from "react-router";
import { get, remove } from "../../utils/request";
import styles from "./Admin.module.css";
// #TODO Make CRUD for orders and users
export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await get("http://localhost:3030/jsonstore/products");
            const items = Object.entries(data || {}).map(([id, p]) => ({ id, ...p }));
            setProducts(items);
        } catch (err) {
            setError(err.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await remove(`http://localhost:3030/jsonstore/products/${id}`);
            setProducts((p) => p.filter((x) => x.id !== id));
        } catch (err) {
            alert(err.message || "Failed to delete product");
        }
    };

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <h1 className={styles['title']}>Products Dashboard</h1>
                <Link to="/admin/create" className={styles['primaryBtn']}>
                    {/* Plus Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Create Product
                </Link>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <div className={styles['tableWrapper']}>
                    <table className={styles['table']}>
                        <thead>
                            <tr>
                                <th style={{width: '80px'}}>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center", padding: 30, color: "#999" }}>
                                        No products found in inventory.
                                    </td>
                                </tr>
                            )}

                            {products.map((prod) => (
                                <tr key={prod.id}>
                                    {/* Image Column */}
                                    <td>
                                        <img 
                                            src={prod.images?.[0] || prod.image || "https://via.placeholder.com/50"} 
                                            alt="thumb" 
                                            className={styles['tableThumb']} 
                                        />
                                    </td>
                                    
                                    <td><strong>{prod.name}</strong></td>
                                    <td>${Number(prod.price).toFixed(2)}</td>
                                    <td>
                                        <span style={{background:'#F0F0F0', padding:'4px 8px', borderRadius:'4px', fontSize:'12px', fontWeight:'600'}}>
                                            {prod.category || 'N/A'}
                                        </span>
                                    </td>
                                    
                                    <td style={{ textAlign: 'right', whiteSpace:'nowrap' }}>
                                        {/* VIEW BUTTON */}
                                        <button className={`${styles['actionBtn']} ${styles['viewBtn']}`} onClick={() => setSelectedProduct(prod)} title="View Details">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                            View
                                        </button>
                                        
                                        {/* EDIT BUTTON */}
                                        <Link to={`/admin/edit/${prod.id}`} style={{textDecoration:'none'}}>
                                            <button className={`${styles['actionBtn']} ${styles['editBtn']}`} title="Edit Product">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                Edit
                                            </button>
                                        </Link>
                                        
                                        {/* DELETE BUTTON */}
                                        <button className={`${styles['actionBtn']} ${styles['deleteBtn']}`} onClick={() => handleDelete(prod.id)} title="Delete Product">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- VIEW MODAL --- */}
            {selectedProduct && (
                <div className={styles['modalOverlay']} onClick={() => setSelectedProduct(null)}>
                    <div className={styles['modalContent']} onClick={(e) => e.stopPropagation()}>
                        <div className={styles['modalHeader']}>
                            <h2 className={styles['modalTitle']}>Product Details</h2>
                            <button className={styles['closeBtn']} onClick={() => setSelectedProduct(null)}>&times;</button>
                        </div>

                        <div className={styles['modalBody']}>
                            <div className={styles['modalImageWrapper']}>
                                <img 
                                    src={selectedProduct.images?.[0] || selectedProduct.image || "https://via.placeholder.com/250"} 
                                    alt={selectedProduct.name} 
                                    className={styles['modalImage']} 
                                />
                            </div>

                            <div className={styles['modalDetails']}>
                                <h3 style={{margin:0, fontSize:'22px'}}>{selectedProduct.name}</h3>
                                
                                <div className={styles['modalRow']}>
                                    <span className={styles['modalLabel']}>Price</span>
                                    <span style={{fontSize:'18px', fontWeight:600}}>${Number(selectedProduct.price).toFixed(2)}</span>
                                </div>

                                <div className={styles['modalRow']}>
                                    <span className={styles['modalLabel']}>Category & Brand</span>
                                    <span>{selectedProduct.category} {selectedProduct.brand ? `• ${selectedProduct.brand}` : ''}</span>
                                </div>

                                {/* COLOR SWATCHES */}
                                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                                    <div className={styles['modalRow']}>
                                        <span className={styles['modalLabel']}>Available Colors</span>
                                        <div className={styles['colorSwatches']}>
                                            {selectedProduct.colors.map((color, index) => (
                                                <div 
                                                    key={index}
                                                    className={styles['colorSwatch']}
                                                    style={{ backgroundColor: color }}
                                                    title={color} // Tooltip shows hex/name on hover
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className={styles['modalRow']}>
                                    <span className={styles['modalLabel']}>Description</span>
                                    <p style={{ margin: 0, lineHeight: 1.6, color: '#555' }}>{selectedProduct.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}