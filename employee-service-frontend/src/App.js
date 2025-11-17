import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Employee Management System</h1>
        <nav>
          <Link to="/">Employee List</Link>
          <Link to="/add">Add Employee</Link>
        </nav>

        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;