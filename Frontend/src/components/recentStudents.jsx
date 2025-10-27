import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Plus, Users, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const RecentStudents = () => {
  const [recentStudents, setRecentStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentStudents = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/students/recent/last10')
        setRecentStudents(response.data)
      } catch (error) {
        console.error('Error fetching recent students:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentStudents()
  }, [])

  // 🌀 Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-white border border-gray-200 rounded-xl shadow-lg my-10">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-600 w-12 h-12 mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading recent students...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto p-10 pt-0 border border-gray-200 rounded-xl shadow-lg my-10 bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-6 gap-4">
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800'>Recent Students</h1>

        <div className="flex items-center justify-end gap-3">
          <Link to="/students">
            {/* View All Students */}
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              <Users size={18} />
              <span>View All</span>
            </button>
          </Link>

          <Link to="/students/add">
            {/* Add New Student */}
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200">
              <Plus size={18} />
              <span>Add New</span>
            </button>
          </Link>
        </div>
      </div>

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
          </tr>
        </thead>

        <tbody className='bg-white'>
          {recentStudents.map(student => (
            <tr key={student._id} className="hover:bg-gray-50 transition">
              <td className="py-2 px-4 border-b border-gray-200">{student.studentId}</td>
              <td className="py-2 px-4 border-b border-gray-200">{student.rollNumber}</td>
              <td className="py-2 px-4 border-b border-gray-200">{student.name}</td>
              <td className="py-2 px-4 border-b border-gray-200 hidden sm:table-cell">{student.gender}</td>
              <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">{student.fatherName}</td>
              <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">{student.motherName}</td>
              <td className="py-2 px-4 border-b border-gray-200 hidden sm:table-cell">{student.age}</td>
              <td className="py-2 px-4 border-b border-gray-200 hidden sm:table-cell">{student.class}</td>
              <td className="py-2 px-4 border-b border-gray-200 hidden md:table-cell">{new Date(student.enrollmentDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b border-gray-200 hidden lg:table-cell">{student.address}</td>
              <td className="py-2 px-4 border-b border-gray-200 hidden lg:table-cell">{student.contactNumber}</td>
              <td className="py-2 px-4 border-b border-gray-200">{new Date(student.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentStudents
