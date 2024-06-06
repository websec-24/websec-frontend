import './ViewAdminOrder.css';
import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';

const ViewAdminOrder = () => {
    const [order, setOrder] = useState([]);
    const [orderLineItems, setOrderLineItems] = useState([]);
    const {orderNumber} = useParams()

    useEffect(() => {
        async function fetchOrder() {
            try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/order-number/${orderNumber}`,{credentials: 'include',});
            console.log(response);
            const data = await response.json();
            console.log(data);
            setOrder(data);
            setOrderLineItems(data.OrderLineItems)
            }
            catch(error) {
            console.log(error);
            } 
      }

      fetchOrder();
  }, [orderNumber])


    const orderLineItemData = orderLineItems.map(orderLineItem =>{
        return <tr key={orderLineItem.id} >
            <th> {orderLineItem.productName}</th>
                <td>{orderLineItem.quantity } </td>
                <td>{orderLineItem.totalPrice} </td>
            </tr>
    });
       


  return (
    <>
     <table className="table table-hover">
      <tbody>
        <tr>
            <th>Ordre Nr.</th>
            <td>{order.orderNumber}</td>
        </tr>
        <tr>
            <th>Kunde Navn</th>
            <td>{order.customerFirstName } {order.customerLastName}</td>
        </tr>
        <tr>
            <th>Adresse</th>
            <td>{order.customerStreet} <br/> {order.customerPostalCode} {order.customerCity}</td>
        </tr>
        <tr>
            <th>Dato</th>
            <td>{order.orderCreatedDate}</td>
        </tr>
        <tr>
            <th>Total Beløb</th>
            <td>{order.totalPrice} kr.</td>
        </tr>
        <tr>
            <th>Betaling Status</th>
            <td>{order.orderPaymentStatus}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>{order.customerEmail}</td>
        </tr>
      </tbody>
    </table>
    <h1>Oversigt bestillingen</h1>
    <table className="table table-hover">
      <thead>
        <tr>
            <th scope="col">Product Navn</th>
            <th scope="col">Antal</th>
            <th scope="col">Total Beløb</th>
        </tr>
      </thead>
      <tbody>
        {orderLineItemData}
      </tbody> 
    </table>
    </>
  )
}

export default ViewAdminOrder
