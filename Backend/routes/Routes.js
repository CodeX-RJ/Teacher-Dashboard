import { Router } from "express";
import Student from "../mongoose schema/Student.js";
import mongoose from "mongoose";

const router = Router();

// Define your routes here

//get all students

router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
});

//return total number of students

router.get('/count/total', async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        res.json({ totalStudents });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving total students count', error: error.message });
    }
});

//return number of students added in last month

router.get('/count/recent/additions', async (req, res) => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const recentStudentsCount = await Student.countDocuments({ createdAt: { $gte: oneMonthAgo } });
        res.json({ recentStudentsCount });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving recent students count', error: error.message });
    }
});

//get student by id
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error: error.message });
    }
});


//based on class 

router.get('/class/:className', async (req, res) => {
    try {
        const students = await Student.find({ class: req.params.className });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students by class', error: error.message });
    }
});

//student added in last month 

router.get('/recent/additions', async (req, res) => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const recentStudents = await Student.find({createdAt: { $gte: oneMonthAgo }});
        res.json(recentStudents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving recent students', error: error.message });
    }
});


//last 10 addes students

router.get('/recent/last10', async (req, res) => {
    try {
        const last10Students = await Student.find().sort({ createdAt: -1 }).limit(10);
        res.json(last10Students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving last 10 students', error: error.message });
    }
});

//total number of classes

router.get('/classes/total', async (req, res) => {
    try {
        const totalClasses = await Student.distinct('class').countDocuments();
        res.json({ totalClasses });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving total classes count', error: error.message });
    }
});

//create student

router.post('/', async (req, res) => {

const studentData = {
      studentId: req.body.studentId,
      rollNumber: req.body.rollNumber,
      name: req.body.name,
      gender: req.body.gender,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      age: req.body.age,
      class: req.body.class,
      address: req.body.address,
      contactNumber: req.body.contactNumber
    };

    try {
        const newStudent = new Student(studentData);
        await newStudent.save();
        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }

});

//update student

router.patch('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
});

//delete student

router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
});


export default router;