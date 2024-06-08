import './Products.css'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/products/productCard/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        async function fetchProducts() {
            try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`);
            console.log(response);
            const data = await response.json();
            console.log(data);
            setProducts(data.data);
            }
            catch(error) {
            console.log(error);
            } 
      }
      fetchProducts();
  }, [])
    return (
        <div className="product-list-container">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
                ))}
        </div>
    )
}

export default Products
