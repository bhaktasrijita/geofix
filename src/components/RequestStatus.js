import React, { useState } from 'react';

const RequestStatus = () => {
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState([]);

  const maskEmail = (email) => {
    const [user, domain] = email.split('@');
    return `${user[0]}*****@${domain}`;
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch(`http://localhost:8000/request/status?email=${email}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Check Request Status</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button onClick={fetchRequests} className="bg-blue-500 text-white py-2 px-4 rounded">
        Search
      </button>

      <div className="mt-6">
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="border-b py-4">
              <p><strong>Request Type:</strong> {request.problem_type}</p>
              <p><strong>Description:</strong> {request.description}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Submitted:</strong> {request.created_on} (e.g., X years, Y months ago)</p>
              <p><strong>Email:</strong> {maskEmail(request.email)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestStatus;
