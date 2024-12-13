import React, { useState } from "react";
import "./MyForm.css";
import { Link } from "react-router-dom";

function MyForm() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "",
  });


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          firebaseUid: JSON.parse(localStorage.getItem("user")).firebaseUid,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      localStorage.setItem("userId", data.user._id);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fname">First Name:</label>
      <input
        type="text"
        id="fname"
        name="fname"
        value={formData.fname}
        onChange={handleChange}
        placeholder="Enter your first name"
      />
      <br />
      <label htmlFor="lname">Last Name:</label>
      <input
        type="text"
        id="lname"
        name="lname"
        value={formData.lname}
        onChange={handleChange}
        placeholder="Enter your last name"
      />
      <br />
      <label htmlFor="gender">Gender:</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />
      <Link to="/home"><button type="submit">Update User Data</button></Link>
    </form>
  );
}

export default MyForm;
