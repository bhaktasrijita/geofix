import React, { useState } from 'react';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    problem_type: '',
    description: '',
    image: null,
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    // Submit to FastAPI backend
    try {
      const response = await fetch('http://localhost:8000/request/', {
        method: 'POST',
        body: formDataObj
      });
      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Submit a Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-bold">Problem Type</label>
          <select
            name="problem_type"
            value={formData.problem_type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a type</option>
            <option value="Incorrect Label">Incorrect Label</option>
            <option value="Divided Road Issue">Divided Road Issue</option>
            <option value="Missing Road">Missing Road</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
