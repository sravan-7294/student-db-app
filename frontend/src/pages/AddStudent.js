import React, { useState } from "react";
import axios from "axios";
import "../styles/AddStudent.css";

export default function AddStudent({ setMessage }) {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    contact: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    // Ensure ID is a valid number
    if (isNaN(Number(formData.id)) || String(formData.id).trim() === "") {
      setMessage("Please enter a valid numeric Student ID.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          ...formData,
          id: Number(formData.id), // Convert ID to number
        }
      );

      setMessage(response.data.message);
      setFormData({ id: "", firstName: "", lastName: "", contact: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || `Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleAddStudent} className="add-form">
      <h3>Add Student</h3>

      <label>ID:</label>
      <input
        type="number" // Use number input
        name="id"
        value={formData.id}
        onChange={handleInputChange}
        required
      />

      <label>First Name:</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />

      <label>Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />

      <label>Contact:</label>
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Add Student</button>
    </form>
  );
}
