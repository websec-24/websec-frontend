import './CheckoutLineItem.css';
import { useShoppingCart } from '../../contexts/ShoppingCartContext.js';
import testImage from '../../assets/products/sunglasses.jpg';

const CheckoutLineItem = ({ lineItem }) => {
    const { removeItemFromCart } = useShoppingCart();

    return (
        <tr key={lineItem.id}>
            <td><img className="checkout-product-image" alt={lineItem.name} src={testImage}></img></td>
            <td className="checkout-product-name">{lineItem.name}</td>
            <td>{lineItem.selectedQuantity}</td>
            <td>${lineItem.price}</td>
            <td>${lineItem.price * lineItem.selectedQuantity}</td>
            <td>
                <button 
                className="shopping-cart-line-item-remove-button"
                onClick={() => {
                    removeItemFromCart(lineItem.id);
                }}>X
                </button>
            </td>
        </tr>
    )
}

export default CheckoutLineItem;