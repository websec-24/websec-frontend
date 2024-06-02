import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Navbar from './components/navbar/Navbar';
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Products from './pages/products/Products';
import AddProducts from './pages/addProducts/AddProducts';

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
                          <Route path="/add-product" element={
                            <PrivateRoute roles={['admin']}>
                              <AddProducts />
                            </PrivateRoute>} />
                      </Routes>
              </div>
          </Router>
        </ShoppingCartProvider>
      </AuthProvider>
    );
}

export default App;
