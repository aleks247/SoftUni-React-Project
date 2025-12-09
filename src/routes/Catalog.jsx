import ProductCard from '../components/ProductCard/ProductCard';
import products from '../products.json'
import styles from '../styles/Styles.module.css'

export default function Catalog() {
    const productItems = products;
    return (
        <>
            <h1>Catalog Page</h1>
            <div className={styles['catalog-container']}>
                {productItems.map(item => <ProductCard key={item._id} {...item} />)}
            </div>
        </>
    );
}
