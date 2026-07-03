import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
        {/* Navigation Menu */}
        <nav style={{ marginBottom: '30px' }}>
          <Link to="/register" style={{ margin: '0 15px', textDecoration: 'none', color: '#007BFF' }}>Register</Link>
          <Link to="/login" style={{ margin: '0 15px', textDecoration: 'none', color: '#007BFF' }}>Login</Link>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;