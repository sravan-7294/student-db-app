import React, { useState } from "react";
import axios from "axios";
import "../styles/GetStudent.css";

export default function GetStudent({ setMessage }) {
  const [id, setId] = useState("");
  const [student, setStudent] = useState(null);

  const handleGetStudent = async (e) => {
    e.preventDefault();
    if (!id.trim() || isNaN(Number(id))) {
      setMessage("Please enter a valid numeric Student ID.");
      setStudent(null);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${Number(id)}`
      );
      setStudent(response.data.student);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || `Error: ${error.message}`);
      setStudent(null);
    }
  };

  return (
    <div className="get-student">
      <form onSubmit={handleGetStudent}>
        <h3>Get Student by ID</h3>
        <label>Student ID:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit">Get Student</button>
      </form>

      {student && (
        <div className="student-details">
          <h4>Student Details</h4>
          <p>
            <strong>ID:</strong> {student.id}
          </p>
          <p>
            <strong>First Name:</strong> {student.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {student.lastName}
          </p>
          <p>
            <strong>Contact:</strong> {student.contact}
          </p>
        </div>
      )}
    </div>
  );
}
