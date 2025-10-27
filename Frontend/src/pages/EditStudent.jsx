import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

const EditStudent = () => {
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

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.patch(`http://localhost:5000/api/students/${id}`, student);
      alert("✅ Student updated successfully!");
      navigate("/students");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("❌ Failed to update student");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 border">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        Edit Student
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div>
          <label className="block font-medium mb-1">Gender</label>
          <input
            type="text"
            name="gender"
            value={student.gender}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

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

        <div>
          <label className="block font-medium mb-1">Enrollment Date</label>
          <input
            type="date"
            name="enrollmentDate"
            value={student.enrollmentDate ? student.enrollmentDate.split("T")[0] : ""}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={student.address}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

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

        <div className="md:col-span-2 flex flex-col md:flex-row gap-3 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full md:w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              "Update Student"
            )}
          </button>

          {/* ✅ Back to All Students Button */}
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

export default EditStudent;
