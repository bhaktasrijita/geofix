import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Mock login validation
    try {
      const response = await fetch('http://localhost:8000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.status === 200) {
        setLoggedIn(true);
        fetchRequests(); // Fetch requests after successful login
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to login');
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const updateRequestStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/admin/request/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      console.log('Updated:', data);
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Render the login form if not logged in
  if (!loggedIn) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 font-bold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
        </form>
      </div>
    );
  }

  // Render the admin requests management page after successful login
  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin - Manage Requests</h2>
      {requests.map((request) => (
        <div key={request.id} className="border-b py-4">
          <p><strong>Request Type:</strong> {request.problem_type}</p>
          <p><strong>Description:</strong> {request.description}</p>
          <p><strong>Status:</strong> {request.status}</p>
          <p><strong>Submitted:</strong> {request.created_on}</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Update Status</option>
            <option value="Request Received">Request Received</option>
            <option value="Processing">Processing</option>
            <option value="QA">QA</option>
            <option value="Change Completed">Change Completed</option>
          </select>
          <button onClick={() => updateRequestStatus(request.id, status)} className="bg-blue-500 text-white py-2 px-4 mt-2 rounded">
            Update Status
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
