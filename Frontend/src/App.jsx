import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import StudentById from './pages/StudentById.jsx'
import AllStudents from './pages/AllStudents.jsx'
import AddStudent from './pages/AddStudent.jsx'
import EditStudent from './pages/EditStudent.jsx'
import Navbar from './components/Navbar.jsx'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/students' element={<AllStudents />} />
        <Route exact path='/students/add' element={<AddStudent />} />
        <Route exact path='/students/edit/:id' element={<EditStudent />} />
        <Route exact path='/students/:id' element={<StudentById />} />
      </Routes>
    
    
    </>
  )
}

export default App