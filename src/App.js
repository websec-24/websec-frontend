import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Navbar from './components/navbar/Navbar';
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'

import Home from './pages/home/Home'

function App() {
    return (
      <AuthProvider>
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/protected" element={<PrivateRoute><Protected /></PrivateRoute>} />
                    </Routes>
            </div>
        </Router>
      </AuthProvider>
    );
}
const Protected = () => <div><h1>Protected Page</h1></div>;

export default App;
