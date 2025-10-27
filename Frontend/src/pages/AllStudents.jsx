import React, { useState, useEffect } from 'react'
import { Plus, Download, Loader2, Pencil, Trash2 } from 'lucide-react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Link } from 'react-router-dom'


const AllStudents = () => {
  const [allStudents, setAllStudents] = useState([])
  const [selectedClass, setSelectedClass] = useState('All')
  const [loading, setLoading] = useState(true)



  const exportToExcel = () => {
  if (allStudents.length === 0) {
    alert('No data to export!')
    return
  }

  // Step 1: Convert JSON data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(allStudents)

  // Step 2: Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students')

  // Step 3: Convert to binary Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

  // Step 4: Create blob and trigger download
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, 'AllStudents.xlsx')
}



//handle delete student
const handleDelete = async(id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this student?");
  if (confirmDelete) {
    // Proceed with deletion
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      // Refresh the student list after deletion
      setAllStudents(allStudents.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  }
};


  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true)
      try {
        let response
        if (selectedClass && selectedClass !== 'All') {
          response = await axios.get(`http://localhost:5000/api/students/class/${selectedClass}`)
        } else {
          response = await axios.get('http://localhost:5000/api/students')
        }
        setAllStudents(response.data)
      } catch (error) {
        console.error('Error fetching all students:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllStudents()
  }, [selectedClass])

  // loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-600 w-12 h-12 mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading students...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='p-10'>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 p-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {selectedClass === 'All'
            ? `All : ${allStudents.length} Students`
            : `Class ${selectedClass} : ${allStudents.length} Students`}
        </h2>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Class Selector */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Classes</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Class {i + 1}
              </option>
            ))}
          </select>

          {/* Buttons */}
          <div className="flex gap-3">
            <Link to="/students/add">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Plus size={18} />
              Add Student
            </button>
            </Link>

            <button onClick={exportToExcel} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200">ID</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200">Roll No.</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200">Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200 hidden sm:table-cell">Gender</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200 hidden md:table-cell">Father Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200 hidden md:table-cell">Mother Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200 hidden sm:table-cell">Age</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200 hidden sm:table-cell">Class</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200 hidden md:table-cell">Enrollment Date</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200 hidden lg:table-cell">Address</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200 hidden lg:table-cell">Contact</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200">Added On</th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold border-b border-gray-200">Actions</th>

            </tr>
          </thead>

          <tbody className='bg-white'>
            {allStudents.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50 transition">
                <td className="py-2 px-4 border-b border-gray-200">{student.studentId}</td>
                <td className="py-2 px-4 border-b border-gray-200">{student.rollNumber}</td>
                <td className="py-2 px-4 border-b border-gray-200">{student.name}</td>
                <td className="py-2 px-4 border-b border-gray-200 hidden sm:table-cell">{student.gender}</td>
                <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">{student.fatherName}</td>
                <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">{student.motherName}</td>
                <td className="py-2 px-4 border-b border-gray-200 hidden sm:table-cell">{student.age}</td>
                <td className="py-2 px-4 border-b border-gray-200 hidden sm:table-cell">{student.class}</td>
                <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 hidden lg:table-cell">{student.address}</td>
                <td className="py-2 px-4 border-b border-gray-200 hidden lg:table-cell">{student.contactNumber}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {new Date(student.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <div className="flex gap-2">
                    <Link to={`/students/edit/${student._id}`}>
                    <button className="flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                      <Pencil size={16} />
                    </button>
                    </Link>
                    <button onClick={() => handleDelete(student._id)} className="flex items-center justify-center bg-red-500 text-white p-2 rounded hover:bg-red-600 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllStudents
