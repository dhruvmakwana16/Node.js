const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../students.json");

const getStudents = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    if (!data.trim()) return [];

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveStudents = (students) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(students, null, 2),
    "utf8"
  );
};

module.exports = {
  getStudents,
  saveStudents
};