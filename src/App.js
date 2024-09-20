import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RequestForm from './components/RequestForm';
import RequestStatus from './components/RequestStatus';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:underline">Submit Request</Link>
            </li>
            <li>
              <Link to="/status" className="text-blue-500 hover:underline">Check Request Status</Link>
            </li>
            <li>
              <Link to="/admin" className="text-blue-500 hover:underline">Admin Page</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<RequestForm />} />
          <Route path="/status" element={<RequestStatus />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
