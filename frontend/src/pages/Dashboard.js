import React, { useState } from "react";
import "../styles/Dashboard.css";

import AddStudent from "./AddStudent";
import DeleteStudent from "./DeleteStudent";
import UpdateStudent from "./UpdateStudent";
import GetStudent from "./GetStudent";
import GetStudents from "./GetStudents";

export default function Dashboard({ onLogout }) {
  const [activeAction, setActiveAction] = useState(null);
  const [message, setMessage] = useState("");

  return (
    <div className="dashboard">
      <header>
        <h1>STUDENT DATABASE</h1>
        <p>
          Manage student records with ease — add, update, delete, and view all
          students.
        </p>
      </header>

      <nav className="actions">
        <button
          onClick={() => {
            setActiveAction(null);
            setMessage("");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            setActiveAction("add");
            setMessage("");
          }}
        >
          Add Student
        </button>
        <button
          onClick={() => {
            setActiveAction("delete");
            setMessage("");
          }}
        >
          Delete Student
        </button>
        <button
          onClick={() => {
            setActiveAction("update");
            setMessage("");
          }}
        >
          Update Student
        </button>
        <button
          onClick={() => {
            setActiveAction("getOne");
            setMessage("");
          }}
        >
          Get Student by ID
        </button>
        <button
          onClick={() => {
            setActiveAction("getAll");
            setMessage("");
          }}
        >
          Get All Students
        </button>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </nav>

      {activeAction === null && (
        <section className="api-info">
          <h2>About the Student Database API</h2>
          <p>
            This Student Database application provides a simple REST API backend
            that allows you to manage student records efficiently. The API
            exposes endpoints to Create, Read, Update, and Delete (CRUD) student
            data in a database.
          </p>

          <h3>How to Use This Dashboard</h3>
          <p>
            This dashboard serves as a frontend client interface to interact
            with the backend API. The menu buttons correspond to different
            operations you can perform on student records.
          </p>

          <h3>API Methods Overview</h3>

          <h4>Add Student (POST)</h4>
          <p>Use this method to add a new student to the database.</p>
          <p>
            You will provide details like student name, ID, contact info, and
            other relevant data.
          </p>
          <p>The API endpoint accepts a JSON payload and stores it.</p>

          <h4>Delete Student (DELETE)</h4>
          <p>
            Use this method to remove a student record permanently from the
            database.
          </p>
          <p>You specify the student by their unique ID.</p>
          <p>The backend removes the student if found.</p>

          <h4>Update Student (PATCH)</h4>
          <p>Use this method to modify existing student information.</p>
          <p>
            Specify which student to update and send only the fields you want to
            change.
          </p>
          <p>The backend applies partial updates to the student record.</p>

          <p>
            <strong>Why PATCH instead of PUT?</strong>
          </p>
          <ul>
            <li>
              PUT is generally used to replace the entire resource record,
              meaning you send the full student data, and the old record is
              completely overwritten.
            </li>
            <li>
              PATCH, however, is designed for partial updates — you send only
              the fields that need changing.
            </li>
            <li>
              This is more efficient and reduces the chance of accidentally
              overwriting data.
            </li>
            <li>
              If you send all fields in a PATCH request, it behaves like PUT,
              updating the entire record.
            </li>
            <li>
              Therefore, the PUT method was omitted in favor of the more
              flexible PATCH method.
            </li>
          </ul>

          <h4>Get All Students (GET)</h4>
          <p>Fetches a list of all student records currently stored.</p>
          <p>Useful to view and verify all existing students in the system.</p>

          <h3>How the Dashboard Interacts with the API</h3>
          <p>
            When you click on a button, the respective form or view will appear
            below, allowing you to send requests to the backend API. The
            dashboard uses HTTP methods corresponding to each action (GET, POST,
            PATCH, DELETE) to perform these operations.
          </p>
          <p>
            The dashboard shows success or error messages based on the API
            response.
          </p>
          <p>
            Ensure your backend server is running and accessible for the
            dashboard to function correctly.
          </p>

          <h3>Technical Notes</h3>
          <ul>
            <li>
              The backend is assumed to be RESTful and serves JSON responses.
            </li>
            <li>
              All requests should be made with the appropriate headers (
              <code>Content-Type: application/json</code>).
            </li>
            <li>
              Authentication is currently basic; logout will end your session.
            </li>
            <li>
              This dashboard uses React hooks to manage state and UI
              interaction.
            </li>
          </ul>
        </section>
      )}

      <section className="action-section">
        {activeAction === "add" && <AddStudent setMessage={setMessage} />}
        {activeAction === "delete" && <DeleteStudent setMessage={setMessage} />}
        {activeAction === "update" && <UpdateStudent setMessage={setMessage} />}
        {activeAction === "getOne" && <GetStudent setMessage={setMessage} />}
        {activeAction === "getAll" && <GetStudents setMessage={setMessage} />}
      </section>

      {message && (
        <p
          className={`message ${
            message.startsWith("Error") ? "error" : "success"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
