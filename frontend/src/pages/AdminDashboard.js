import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [volunteers, setVolunteers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllUsers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('/api/auth/users', {
                    method: 'GET',
                    headers: { 'x-auth-token': token } 
                });

                const data = await response.json();

                if (response.ok) {
                    setVolunteers(data);
                } else {
                    setError('Failed to load users.');
                }
            } catch (err) {
                setError('Server connection error.');
            }
        };

        fetchAllUsers();
    }, [navigate]);

    // NEW FUNCTION: Convert the table data to a downloadable CSV file
    const downloadReport = () => {
        // 1. Define the CSV headers
        const csvHeaders = "Name,Email,User ID\n";
        
        // 2. Loop through the volunteers array and format each one as a row
        const csvRows = volunteers.map(vol => `"${vol.name}","${vol.email}","${vol._id}"`).join("\n");
        
        // 3. Combine headers and rows
        const csvString = csvHeaders + csvRows;
        
        // 4. Create a file blob in the browser
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        
        // 5. Create a hidden link, click it to trigger the download, and remove it
        const link = document.createElement('a');
        link.href = url;
        link.download = 'volunteer_report.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}>Admin Dashboard - Registered Volunteers</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            
            {/* NEW BUTTON: Triggers the CSV download */}
            <button 
                onClick={downloadReport} 
                style={{ display: 'block', margin: '0 auto 20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                ⬇️ Download CSV Report
            </button>

            <table style={{ width: '80%', margin: '20px auto', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <thead>
                    <tr style={{ backgroundColor: '#007BFF', color: 'white' }}>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteers.map((vol) => (
                        <tr key={vol._id} style={{ backgroundColor: '#f9f9f9' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{vol.name}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{vol.email}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd', color: '#555', fontSize: '14px' }}>{vol._id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;