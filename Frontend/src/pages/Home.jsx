import React, { useState, useEffect } from 'react'
import { GraduationCap, UserPlus, Book, Loader2 } from 'lucide-react'
import RecentStudents from '../components/recentStudents.jsx'
import axios from 'axios'

const Home = () => {
  const [allStudents, setAllStudents] = useState(0)
  const [allClasses, setAllClasses] = useState(0)
  const [noOfRecentStudents, setNoOfRecentStudents] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classRes, studentRes, recentRes] = await Promise.all([
          axios.get('http://localhost:5000/api/students/classes/total'),
          axios.get('http://localhost:5000/api/students/count/total'),
          axios.get('http://localhost:5000/api/students/count/recent/additions'),
        ])

        setAllClasses(classRes.data.totalClasses)
        setAllStudents(studentRes.data.totalStudents)
        setNoOfRecentStudents(recentRes.data.recentStudentsCount)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 🌀 Loading effect while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-600 w-12 h-12 mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // ✅ Main content after loading
  return (
    <div className='p-2 px-6 lg:px-10 xl:px-14'>
      <h1 className='text-black text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-4'>
        Welcome to the Teacher Dashboard
      </h1>
      <h4 className='text-gray-600 text-md md:text-lg lg:text-xl xl:text-2xl mt-2 mb-10'>
        Your one-stop solution for managing student data
      </h4>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10 md:gap-14 lg:gap-20'>
        {/* Total Students */}
        <div className='flex justify-between shadow-lg p-6 lg:p-10 bg-white rounded-lg border border-gray-200'>
          <div>
            <h3 className='font-semibold text-black text-lg md:text-xl lg:text-2xl xl:text-3xl md:my-4 lg:my-6'>
              Total Students
            </h3>
            <h1 className='text-xl md:text-2xl text-blue-600 font-bold lg:text-4xl xl:text-5xl'>
              {allStudents}
            </h1>
            <h3 className='text-gray-500 text-lg md:text-xl lg:text-2xl xl:text-3xl md:my-4 lg:my-6'>
              Across all classes
            </h3>
          </div>
          <div className='self-center border border-white bg-blue-100 rounded-full p-2 lg:mr-8'>
            <GraduationCap className='w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 text-blue-700' />
          </div>
        </div>

        {/* Recent Admission */}
        <div className='flex justify-between shadow-lg p-6 lg:p-10 bg-white rounded-lg border border-gray-200'>
          <div>
            <h3 className='font-semibold text-black text-lg md:text-xl lg:text-2xl xl:text-3xl md:my-4 lg:my-6'>
              Recent Admission
            </h3>
            <h1 className='text-xl md:text-2xl text-green-600 font-bold lg:text-4xl xl:text-5xl'>
              {noOfRecentStudents}
            </h1>
            <h3 className='text-gray-500 text-lg md:text-xl lg:text-2xl xl:text-3xl md:my-4 lg:my-6'>
              New students this month
            </h3>
          </div>
          <div className='self-center border border-white bg-green-100 rounded-full p-2 lg:mr-8'>
            <UserPlus className='w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 text-green-700' />
          </div>
        </div>

        {/* Active Classes */}
        <div className='flex justify-between shadow-lg p-6 lg:p-10 bg-white rounded-lg border border-gray-200'>
          <div>
            <h3 className='font-semibold text-black text-lg md:text-xl lg:text-2xl xl:text-3xl md:my-4 lg:my-6'>
              Active Classes
            </h3>
            <h1 className='text-xl md:text-2xl text-red-600 font-bold lg:text-4xl xl:text-5xl'>
              {allClasses}
            </h1>
            <h3 className='text-gray-500 text-lg md:text-xl lg:text-2xl xl:text-3xl md:my-4 lg:my-6'>
              Currently active classes
            </h3>
          </div>
          <div className='self-center border border-white bg-red-100 rounded-full p-2 lg:mr-8'>
            <Book className='w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 text-red-700' />
          </div>
        </div>
      </div>

      <RecentStudents />
    </div>
  )
}

export default Home
