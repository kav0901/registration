import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch the private profile data
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            // If there's no token, kick them back to login
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('/api/auth/profile', {
                    method: 'GET',
                    headers: {
                        'x-auth-token': token // Showing our VIP pass to the Bouncer!
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setUserData(data); // Save the user's info to display it
                } else {
                    // If the token is invalid or expired, clear it and kick them out
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (err) {
                setError('Failed to connect to the server.');
            }
        };

        fetchProfile();
    }, [navigate]);

    // A function to handle logging out
    const handleLogout = () => {
        localStorage.removeItem('token'); // Shred the VIP pass
        navigate('/login'); // Send them back to login
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
            <h2>Volunteer Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {userData ? (
                <div style={{ padding: '20px', border: '1px solid #ddd', display: 'inline-block', borderRadius: '10px' }}>
                    <h3>Welcome back, {userData.name}!</h3>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                    <button 
                        onClick={handleLogout}
                        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
                        Log Out
                    </button>
                </div>
            ) : (
                <p>Loading your profile...</p>
            )}
        </div>
    );
}

export default Dashboard;