import React, { useState } from "react";
import axios from "axios";
import "../styles/UpdateStudent.css";

export default function UpdateStudent({ setMessage }) {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    contact: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    // Ensure ID is a valid number
    if (isNaN(Number(formData.id)) || formData.id.trim() === "") {
      setMessage("Please enter a valid numeric Student ID.");
      return;
    }

    const updateData = {};
    ["firstName", "lastName", "contact"].forEach((field) => {
      if (formData[field].trim() !== "") {
        updateData[field] = formData[field].trim();
      }
    });

    if (Object.keys(updateData).length === 0) {
      setMessage("Please fill at least one field to update.");
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/${Number(formData.id)}`,
        updateData
      );
      setMessage(response.data.message);
      setFormData({ id: "", firstName: "", lastName: "", contact: "" });
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleUpdateStudent} className="update-form">
      <h3>Update Student</h3>
      <label>Student ID to update:</label>
      <input
        type="number" // Number input
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
        placeholder="Leave empty if no change"
      />
      <label>Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        placeholder="Leave empty if no change"
      />
      <label>Contact:</label>
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleInputChange}
        placeholder="Leave empty if no change"
      />
      <button type="submit">Update Student</button>
    </form>
  );
}
