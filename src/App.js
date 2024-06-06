import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext.js';
import PrivateRoute from './components/privateRoute/PrivateRoute.js';
import Navbar from './components/navbar/Navbar.js';
import Signup from './pages/signup/Signup.js';
import Login from './pages/login/Login.js';
import Products from './pages/products/Products.js';
import AddProducts from './pages/addProducts/AddProducts.js';
import Checkout from './pages/Checkout/Checkout.js';
import AdminOrders from './pages/AdminOrders/AdminOrders.js';
import ViewAdminOrder from './pages/ViewAdminOrder/ViewAdminOrder.js';
import CustomerOrders from './pages/CustomerOrders/CustomerOrders.js';
import CustomerOrderView from './pages/CustomerOrderView/CustomerOrderView.js';

import Home from './pages/home/Home'

function App() {

    return (
      <AuthProvider>
        <ShoppingCartProvider>
          <Router>
              <div className="App">
                  <Navbar />
                  <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/add-product" element={
                            <PrivateRoute roles={['admin']}>
                              <AddProducts />
                            </PrivateRoute>} />
                          <Route path="/admin-orders" element={
                            <PrivateRoute roles={['admin']}>
                              <AdminOrders />
                            </PrivateRoute>} />
                          <Route path="/your-orders" element={
                            <PrivateRoute roles={['customer']}>
                              <CustomerOrders />
                            </PrivateRoute>} />
                          <Route path="/admin-orders/:orderNumber" element={
                            <PrivateRoute roles={['admin']}>
                              <ViewAdminOrder />
                            </PrivateRoute>} />
                          <Route path="/your-orders/:orderNumber" element={
                            <PrivateRoute roles={['customer']}>
                              <CustomerOrderView />
                            </PrivateRoute>} />
                      </Routes>
              </div>
          </Router>
        </ShoppingCartProvider>
      </AuthProvider>
    );
}

export default App;
