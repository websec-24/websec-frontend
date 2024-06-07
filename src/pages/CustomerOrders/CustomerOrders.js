import './CustomerOrders.css'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { useAuth } from '../../contexts/AuthContext';


const CustomerOrders = () => {
    const { currentUser } = useAuth();
    console.log(currentUser)

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/customer-order`, {
              credentials: 'include',
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            setOrders(data);
            }
            catch(error) {
            console.log(error);
            } 
      }

      fetchOrders();
  }, [currentUser])
   console.log(orders)
  const orderData = orders.map(order => {
    return <tr key={order.id} >
      <th> {order.orderNumber}</th>
        <td>{order.customerFirstName } {order.customerLastName}</td>
        <td>{order.customerStreet} <br/> {order.customerPostalCode} {order.customerCity}</td>
        <td>{order.orderCreatedDate}</td>
        <td>{order.totalPrice} kr.</td>
        <td>{order.orderPaymentStatus}</td>
        <td><Link to={`/your-orders/${order.orderNumber}`}>
              <button type="button" className="add-new-btn btn btn-outline-success"><IoEyeSharp/></button>
            </Link>
          </td>
          
      </tr>
  })
     
  


  return (
    <>
    <table className="table table-hover">
      <thead>
        <tr>
            <th scope="col">Order Nr.</th>
            <th scope="col">Dit Navn</th>
            <th scope="col">Din Adresse</th>
            <th scope="col">Dato</th>
            <th scope="col">Total Beløb</th>
            <th scope="col">Betaling Status</th>
            <th scope="col"> </th>
        </tr>
      </thead>
      <tbody>
      {orders.length > 0 ? orderData : <tr><td colSpan="7">No orders found</td></tr>}
      </tbody> 
    </table>
    </>
  )
}

export default CustomerOrders
