const {
  getStudents,
  saveStudents
} = require("../utils/fileHandler");

// GET ALL
const getAllStudents = (req, res) => {
  const students = getStudents();

  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
};

// ADD
const addStudent = (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const students = getStudents();

  const newStudent = {
    id: Date.now(),
    name,
    age,
    course
  };

  students.push(newStudent);

  saveStudents(students);

  res.status(201).json({
    success: true,
    message: "Student Added",
    data: newStudent
  });
};

// UPDATE
const updateStudent = (req, res) => {
  const id = Number(req.params.id);

  const students = getStudents();

  const studentIndex = students.findIndex(
    student => student.id === id
  );

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found"
    });
  }

  students[studentIndex] = {
    ...students[studentIndex],
    ...req.body
  };

  saveStudents(students);

  res.status(200).json({
    success: true,
    message: "Student Updated",
    data: students[studentIndex]
  });
};

// DELETE
const deleteStudent = (req, res) => {
  const id = Number(req.params.id);

  const students = getStudents();

  const filteredStudents = students.filter(
    student => student.id !== id
  );

  if (students.length === filteredStudents.length) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found"
    });
  }

  saveStudents(filteredStudents);

  res.status(200).json({
    success: true,
    message: "Student Deleted"
  });
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
};