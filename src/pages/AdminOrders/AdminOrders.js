import './AdminOrders.css';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";


const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
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
  }, [])
   
  const orderData = orders.map(order =>{
    return <tr key={order.id} >
      <th> {order.orderNumber}</th>
        <td>{order.customerFirstName } {order.customerLastName}</td>
        <td>{order.customerStreet} <br/> {order.customerPostalCode} {order.customerCity}</td>
        <td>{order.orderCreatedDate}</td>
        <td>{order.totalPrice} kr.</td>
        <td>{order.orderPaymentStatus}</td>
        <td><Link to={`/admin-orders/${order.orderNumber}`}>
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
            <th scope="col">Kunde Navn</th>
            <th scope="col">Adresse</th>
            <th scope="col">Dato</th>
            <th scope="col"> Total Beløb</th>
            <th scope="col"> Betaling Status</th>
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

export default AdminOrders
