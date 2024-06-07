import './Checkout.css'
import { useShoppingCart } from '../../contexts/ShoppingCartContext.js';
import { useEffect, useState } from 'react';
import CheckoutLineItem from '../../components/CheckoutLineItem/CheckoutLineItem.js';
import toastr from 'toastr';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../contexts/AuthContext';


const Checkout = () => {
    const { cart, clearCart, getPriceTotal } = useShoppingCart();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        postalCode: '',
        address: '',
        city: ''
    });
    const { currentUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const isFormFilled = formData.postalCode && formData.address && formData.city && formData.firstName && formData.lastName ;

    async function createCheckoutSession(e) {
        e.preventDefault();
        
        const orderDetails = {
          items: cart.map((lineItem) => {
            return {
              productId: lineItem.id,
              quantity: lineItem.selectedQuantity
            }
          }),
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: currentUser.email,
            city: formData.city,
            postalCode: formData.postalCode,
            address: formData.address,
          }
        }
  
        console.log(orderDetails);
  
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/checkout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails)
          });
    
          if (response.ok) {
            const data = await response.json();
            window.location = data.sessionId;
          }
        }
        catch(error) {
          console.log(error);
          toastr.error('There was an error while trying to check out. Please try again later.')
        }
      }
     
      useEffect(() => {
          if (cart.length === 0) {
              window.location = '/products';
          }
      }, [cart])
      
    

  return (
    <>
    <div className="checkout-line-item-container">
        <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price/unit</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((lineItem) => {
                return (
                    <CheckoutLineItem key={lineItem.id} lineItem={lineItem}></CheckoutLineItem>
                )
              })}
            </tbody>
        </table>

        <h5 className="shopping-cart-total">Total price: ${getPriceTotal()}</h5>
        <div className="checkout-button-container">
            <Button variant="danger" onClick={clearCart}>
              Clear shopping cart
            </Button>
        </div>

        <div className="checkout-form-container">

            <form onSubmit={createCheckoutSession}>

                <div className="checkout-form-group">
                    <label className="checkout-form-label" htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>

                <div className="checkout-form-group">
                    <label className="checkout-form-label" htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>

                <div className="checkout-form-group">
                    <label className="checkout-form-label" htmlFor="postalCode">Postal Code:</label>
                    <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                </div>

                <div className="checkout-form-group">
                    <label className="checkout-form-label" htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="checkout-form-group">
                    <label className="checkout-form-label" htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                </div>

                <div className="checkout-form-button-container">
                    <Button variant="primary" type="submit" disabled={!isFormFilled}>
                        Proceed to payment
                    </Button>
                </div>

            </form>
        </div>
    </div>
    </>
  )
}

export default Checkout
