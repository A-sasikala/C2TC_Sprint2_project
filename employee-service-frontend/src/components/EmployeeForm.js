import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeForm.css";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    empId: "",
    empName: "",
    empEmail: "",
    empDepartment: "",
    empSalary: "",
    empDesignation: "",
    empAge: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/employeeservice", employee);
      alert("Employee added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee!");
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="empId" placeholder="Employee ID" value={employee.empId} onChange={handleChange} required />
        <input name="empName" placeholder="Name" value={employee.empName} onChange={handleChange} required />
        <input name="empEmail" placeholder="Email" value={employee.empEmail} onChange={handleChange} required />
        <input name="empDepartment" placeholder="Department" value={employee.empDepartment} onChange={handleChange} required />
        <input name="empSalary" placeholder="Salary" type="number" value={employee.empSalary} onChange={handleChange} required />
        <input name="empDesignation" placeholder="Designation" value={employee.empDesignation} onChange={handleChange} required />
        <input name="empAge" placeholder="Age" type="number" value={employee.empAge} onChange={handleChange} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EmployeeForm;