import { useEffect, useState } from "react";
import { Link } from "react-router";
import { get, remove } from "../../utils/request";
import Table from "../../components/Table/Table";
import styles from "./Admin.module.css";

export default function AdminDashboard() {
    const [dashboardsActive, setDashboardsActive] = useState("users");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await get("http://localhost:3030/jsonstore/products");
            setProducts(Object.entries(data || {}).map(([id, p]) => ({ id, ...p })));
        } catch (err) {
            setError(err.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await get("http://localhost:3030/jsonstore/users");
            setUsers(Object.entries(data || {}).map(([id, u]) => ({ id, ...u })));
        } catch (err) {
            setError(err.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await get("http://localhost:3030/jsonstore/orders");
            setOrders(Object.entries(data || {}).map(([id, o]) => ({ id, ...o })));
        } catch (err) {
            setError(err.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (dashboardsActive === "products") fetchProducts();
        if (dashboardsActive === "users") fetchUsers();
        if (dashboardsActive === "orders") fetchOrders();
    }, [dashboardsActive]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await remove(`http://localhost:3030/jsonstore/products/${id}`);
            setProducts((p) => p.filter((x) => x.id !== id));
        } catch (err) {
            alert(err.message || "Failed to delete product");
        }
    };

    const productColumns = [
        {
            label: "Image",
            render: (prod) => (
                <img
                    src={prod.images?.[0] || prod.image || "https://via.placeholder.com/50"}
                    alt={prod.name}
                    className={styles.tableThumb}
                />
            ),
        },
        { label: "Name", render: (prod) => <strong>{prod.name}</strong> },
        { label: "Price", render: (prod) => `$${Number(prod.price).toFixed(2)}` },
        { label: "Category", render: (prod) => <span className={styles.categoryBadge}>{prod.category || "N/A"}</span> },
    ];

    const userColumns = [
        { label: "Email", render: (u) => u.email },
        { label: "Role", render: (u) => u.role },
        { label: "Created", render: (u) => new Date(u.createdAt).toLocaleDateString() },
    ];

    const orderColumns = [
        { label: "Order ID", render: (o) => o.id },
        { label: "User", render: (o) => o.userEmail },
        { label: "Total", render: (o) => `$${o.total.toFixed(2)}` },
        { label: "Status", render: (o) => o.status },
    ];

    const actions = (prod) => (
        <>
            <Link to={`/catalog/${prod.id}`} style={{ textDecoration: "none" }}>
                <button className={`${styles.actionBtn} ${styles.viewBtn}`}>View</button>
            </Link>

            <Link to={`/admin/edit/${prod.id}`} style={{ textDecoration: "none" }}>
                <button className={`${styles.actionBtn} ${styles.editBtn}`}>Edit</button>
            </Link>

            <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(prod.id)}>Delete</button>
        </>
    );

    let tableData = [];
    let tableColumns = [];
    let emptyMessage = "";

    switch (dashboardsActive) {
        case "users":
            tableData = users;
            tableColumns = userColumns;
            emptyMessage = "No users found.";
            break;
        case "products":
            tableData = products;
            tableColumns = productColumns;
            emptyMessage = "No products found.";
            break;
        case "orders":
            tableData = orders;
            tableColumns = orderColumns;
            emptyMessage = "No orders found.";
            break;
        default:
            break;
    }

    return (
        <>
            <div className={styles.dashboards}>
                <button className={dashboardsActive === "users" ? styles.activeDashboard : ""} onClick={() => setDashboardsActive("users")}>Users</button>
                <button className={dashboardsActive === "products" ? styles.activeDashboard : ""} onClick={() => setDashboardsActive("products")}>Products</button>
                <button className={dashboardsActive === "orders" ? styles.activeDashboard : ""} onClick={() => setDashboardsActive("orders")}>Orders</button>
            </div>

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{dashboardsActive.charAt(0).toUpperCase() + dashboardsActive.slice(1)} Dashboard</h1>
                    {dashboardsActive === "products" && (
                        <Link to="/admin/create" className={styles.primaryBtn}>Create Product</Link>
                    )}
                </div>

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && (
                    <Table
                        data={tableData}
                        columns={tableColumns}
                        actions={dashboardsActive === "products" ? actions : undefined}
                        emptyMessage={emptyMessage}
                    />
                )}
            </div>
        </>
    );
}
