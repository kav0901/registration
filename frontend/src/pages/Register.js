import React, { useState } from 'react';

function Register() {
    // 1. Create variables to store what the user types
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // 2. Create the function that runs when they click submit
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        try {
            // Send the data to your backend API
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ ' + data.message);
                // Clear the form
                setName(''); setEmail(''); setPassword('');
            } else {
                setMessage('❌ ' + data.message);
            }
        } catch (error) {
            setMessage('❌ Server error, please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
            <h2>Volunteer Registration</h2>
            
            {/* Show success or error messages here */}
            {message && <p style={{ fontWeight: 'bold' }}>{message}</p>}

            {/* 3. Connect the form to our variables and function */}
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '10px', margin: '10px', width: '250px' }} 
                    required 
                /><br />
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
                    style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Register;