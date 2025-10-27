import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        required: true,
        unique: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    class: {
        type: Number,
        required: true
    },

    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;