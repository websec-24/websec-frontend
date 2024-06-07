import './ProductCard.css';
import testImage from '../../../assets/products/sunglasses.jpg'
import { useShoppingCart } from '../../../contexts/ShoppingCartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addItemToCart } = useShoppingCart();
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const goToProduct = () => {
        navigate(`/products/${product.id}`)
    }

    const incrementQuantity = () => {
        setSelectedQuantity(prevQuantity => prevQuantity + 1);
    }

    const decrementQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (value >= 1) {
            setSelectedQuantity(value);
        }
    }

    const addToCart = () => {
        addItemToCart({ ...product, selectedQuantity });
        setSelectedQuantity(1);
    }

    return (
        <div className="product-card">
            <div className="product-card-image-container">
                <img src={testImage} alt="Product image" />
            </div>

            <div className="product-card-information-container">
                <h3>{product.name}</h3>
                <div className="product-card-information-description-container">
                    <p>{product.description}</p>
                </div>
                <h4>${product.price}</h4>
            </div>

            <div className="product-card-button-container">
                <button onClick={decrementQuantity}>
                    -
                </button>
                <input className="product-card-quantity" type='number' value={selectedQuantity} onChange={handleQuantityChange}></input>
                <button onClick={incrementQuantity}>
                    +
                </button>
                
            </div>
            <div className="product-card-add-to-cart-button-container">
                <button className="product-card-add-to-cart-button" onClick={addToCart}>Add to cart</button>
                <button className="product-card-go-to-product-button" onClick={goToProduct}>View product</button>   
            </div>        
        </div>
    )
}

export default ProductCard;