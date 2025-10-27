import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [student, setStudent] = useState({
    studentId: "",
    rollNumber: "",
    name: "",
    gender: "",
    fatherName: "",
    motherName: "",
    age: "",
    class: "",
    enrollmentDate: "",
    address: "",
    contactNumber: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // Handle form submit (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("https://teacher-dashboard-cjkx.onrender.com/api/students", student);
      alert("✅ Student added successfully!");
      setStudent({
        studentId: "",
        rollNumber: "",
        name: "",
        gender: "",
        fatherName: "",
        motherName: "",
        age: "",
        class: "",
        enrollmentDate: "",
        address: "",
        contactNumber: "",
      });
      navigate("/students");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("❌ Failed to add student");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 border">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        Add New Student
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Student ID */}
        <div>
          <label className="block font-medium mb-1">Student ID</label>
          <input
            type="number"
            name="studentId"
            value={student.studentId}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Roll Number */}
        <div>
          <label className="block font-medium mb-1">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={student.gender}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Father Name */}
        <div>
          <label className="block font-medium mb-1">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={student.fatherName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Mother Name */}
        <div>
          <label className="block font-medium mb-1">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            value={student.motherName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Class */}
        <div>
          <label className="block font-medium mb-1">Class</label>
          <input
            type="number"
            name="class"
            value={student.class}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Enrollment Date */}
        <div>
          <label className="block font-medium mb-1">Enrollment Date</label>
          <input
            type="date"
            name="enrollmentDate"
            value={student.enrollmentDate}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-medium mb-1">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={student.contactNumber}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={student.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex flex-col md:flex-row gap-3 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full md:w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Adding...
              </>
            ) : (
              "Add Student"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/students")}
            className="w-full md:w-1/2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
          >
            ← Back to All Students
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
