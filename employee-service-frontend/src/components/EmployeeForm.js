import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams(); // get id from URL (edit mode)

  useEffect(() => {
    if (id) {
      loadEmployee(); // fetch old data & show in form
    }
  }, [id]);

  const loadEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/employeeservice/${id}`);
      setEmployee(response.data);
    } catch (error) {
      alert("Failed to load employee");
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // UPDATE
        await axios.put("http://localhost:8080/employeeservice/update", employee);
        alert("Employee Updated Successfully!");
      } else {
        // ADD NEW
        await axios.post("http://localhost:8080/employeeservice/add", employee);
        alert("Employee Added Successfully!");
      }

      navigate("/"); // go to list page

    } catch (error) {
      alert("Failed!");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="empId"
          value={employee.empId}
          onChange={handleChange}
          placeholder="Employee ID"
          disabled={id} // ID cannot change in edit mode
        />

        <input
          type="text"
          name="empName"
          value={employee.empName}
          onChange={handleChange}
          placeholder="Employee Name"
        />

        <input
          type="email"
          name="empEmail"
          value={employee.empEmail}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="text"
          name="empDepartment"
          value={employee.empDepartment}
          onChange={handleChange}
          placeholder="Department"
        />

        <input
          type="number"
          name="empSalary"
          value={employee.empSalary}
          onChange={handleChange}
          placeholder="Salary"
        />

        <input
          type="text"
          name="empDesignation"
          value={employee.empDesignation}
          onChange={handleChange}
          placeholder="Designation"
        />

        <input
          type="number"
          name="empAge"
          value={employee.empAge}
          onChange={handleChange}
          placeholder="Age"
        />

        <button type="submit">{id ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;