import React, { useState } from "react";
import axios from "axios";
import "../styles/DeleteStudent.css";

export default function DeleteStudent({ setMessage }) {
  const [id, setId] = useState("");

  const handleDeleteStudent = async (e) => {
    e.preventDefault();

    if (isNaN(Number(id)) || String(id).trim() === "") {
      setMessage("Please enter a valid numeric Student ID.");
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/users/${Number(id)}`
      ); // Ensure numeric ID
      setMessage(response.data.message || "Student deleted successfully.");
      setId("");
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleDeleteStudent} className="delete-form">
      <h3>Delete Student</h3>
      <label>Student ID to delete:</label>
      <input
        type="number" // Number input
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <button type="submit" style={{ backgroundColor: "red", color: "white" }}>
        Delete Student
      </button>
    </form>
  );
}
