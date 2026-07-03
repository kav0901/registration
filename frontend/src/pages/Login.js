import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://registration-backend-24jg.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ Login successful!');
                // Save the JWT VIP pass in the browser
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
                // Clear the form
                setEmail(''); setPassword('');
            } else {
                setMessage('❌ ' + data.message);
            }
        } catch (error) {
            setMessage('❌ Server error, please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
            <h2>Volunteer Login</h2>
            
            {message && <p style={{ fontWeight: 'bold' }}>{message}</p>}

            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '10px', margin: '10px', width: '250px' }} 
                    required 
                /><br />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '10px', margin: '10px', width: '250px' }} 
                    required 
                /><br />
                <button 
                    type="submit" 
                    style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;