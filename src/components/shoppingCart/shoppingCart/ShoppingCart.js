import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ShoppingCartLineItem from '../shoppingCartLineItem/ShoppingCartLineItem';
import './ShoppingCart.css'
import { useShoppingCart } from '../../../contexts/ShoppingCartContext';


function ShoppingCart() {
    const { cart, getItemTotal, clearCart, getPriceTotal } = useShoppingCart();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <>
      <Button variant="primary" onClick={handleShow}>
        { getItemTotal() === 0 ? 'Empty cart': getItemTotal()}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {cart.length === 0 ? (
                        <h5>Your cart is empty.</h5>
                    ) : (
                      <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price/unit</th>
                                    <th></th>
                              
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((lineItem) => {
                                    return (
                                        <ShoppingCartLineItem
                                            key={lineItem.id}
                                            lineItem={lineItem} />
                                    )
                                })}
                                    
                            </tbody>
                        </table>

                        <h5 className="shopping-cart-total">Total: ${getPriceTotal()}</h5>

                        <div className='shopping-cart-button-container'>
                        <Button variant="danger" className="shopping-cart-button shopping-cart-clear-cart-button" onClick={clearCart}>Clear Cart</Button>

                        <Link to="/checkout">
                          <Button className="shopping-cart-button" onClick={handleClose}>Go to checkout</Button>
                        </Link>
                      </div>
                      </>
                        
                    )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ShoppingCart;