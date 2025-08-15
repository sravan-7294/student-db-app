import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/GetStudents.css";

export default function GetStudents({ setMessage }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`);

        // Sort students by ID (ascending) if array exists
        const sortedStudents = (res.data.students || []).sort(
          (a, b) => Number(a.id) - Number(b.id)
        );

        setStudents(sortedStudents);
        setMessage(res.data.message || "");
      } catch (err) {
        setMessage(
          "Error fetching students: " +
            (err.response?.data?.message || err.message)
        );
        setStudents([]);
      }
    };

    fetchStudents();
  }, [setMessage]);

  return (
    <div className="students-table">
      <h3>All Students</h3>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table
          border="1"
          cellPadding="5"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu._id}>
                <td>{stu.id}</td>
                <td>{stu.firstName}</td>
                <td>{stu.lastName}</td>
                <td>{stu.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
