import { useState } from "react";
import { useNavigate } from "react-router";
import { post } from "../../utils/request";
import styles from "./Admin.module.css";

export default function AdminCreateProduct() {
    const [name, setName] = useState("");
    const [imagesStr, setImagesStr] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [tag, setTag] = useState("");
    const [colorsStr, setColorsStr] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const images = imagesStr.split(",").map((s) => s.trim()).filter(Boolean);
        const colors = colorsStr.split(",").map((s) => s.trim()).filter(Boolean);

        const data = {
            name,
            images,
            price: Number(price) || 0,
            category,
            brand,
            tag,
            colors,
            desc,
        };

        try {
            await post("http://localhost:3030/jsonstore/products", data);
            navigate("/admin");
        } catch (err) {
            alert(err.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <h1 className={styles['title']}>Create Product</h1>
            </div>

            <form onSubmit={onSubmit} className={styles['form']}>
                <div className={styles['inputGroup']}>
                    <label className={styles['label']}>Name</label>
                    <input className={styles['input']} value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className={styles['inputGroup']}>
                    <label className={styles['label']}>Images (comma separated URLs)</label>
                    <input className={styles['input']} value={imagesStr} onChange={(e) => setImagesStr(e.target.value)} placeholder="http://..., http://..." />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div className={styles['inputGroup']}>
                        <label className={styles['label']}>Brand</label>
                        <input className={styles['input']} value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </div>
                    <div className={styles['inputGroup']}>
                        <label className={styles['label']}>Tag (optional)</label>
                        <input className={styles['input']} value={tag} onChange={(e) => setTag(e.target.value)} placeholder="New, Sale, etc." />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div className={styles['inputGroup']}>
                        <label className={styles['label']}>Price</label>
                        <input className={styles['input']} type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className={styles['inputGroup']}>
                        <label className={styles['label']}>Category</label>
                        <input className={styles['input']} value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                </div>

                <div className={styles['inputGroup']}>
                    <label className={styles['label']}>Colors (comma separated hex or names)</label>
                    <input className={styles['input']} value={colorsStr} onChange={(e) => setColorsStr(e.target.value)} placeholder="#000000, #FFFFFF" />
                </div>

                <div className={styles['inputGroup']}>
                    <label className={styles['label']}>Description</label>
                    <textarea className={styles['textarea']} value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>

                <div style={{ marginTop: 10 }}>
                    <button className={styles['primaryBtn']} type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}