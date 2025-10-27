import React from 'react'
import { User, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='h-1/12 lg:h-14 xl:h-18 flex items-center justify-between border-b-2 border-gray-300 bg-blue-200 p-2 px-6 lg:px-10 xl:px-14'>

      {/* Left side: Title */}
      <h1 className='font-serif font-bold text-lg lg:text-2xl xl:text-3xl'>Teacher Dashboard</h1>

      {/* Right side: Home button + User icon */}
      <div className='flex items-center gap-4'>

        {/* Home Button */}
        <Link 
          to='/' 
          className='flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-2 xl:px-5 xl:py-2 border border-black rounded-full bg-white hover:bg-gray-100 transition'
        >
          <Home className='w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-blue-600' />
          <span className='text-sm lg:text-base xl:text-lg font-medium text-blue-700'>Home</span>
        </Link>

        {/* User Icon */}
        <div className='border border-black rounded-full bg-white p-1'>
          <User className='w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10' />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
