const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

const API_URL = "/students";

// Load Students
async function fetchStudents() {

    const response = await fetch(API_URL);

    const result = await response.json();

    studentList.innerHTML = "";

    result.data.forEach(student => {

        studentList.innerHTML += `
            <div class="student">

                <h3>${student.name}</h3>

                <p>Age : ${student.age}</p>

                <p>Course : ${student.course}</p>

                <div class="actions">

                    <button onclick="deleteStudent(${student.id})">
                        Delete
                    </button>

                </div>

            </div>
        `;
    });
}

// Add Student
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;

    const age = document.getElementById("age").value;

    const course = document.getElementById("course").value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            age,
            course
        })
    });

    form.reset();

    fetchStudents();
});

// Delete Student
async function deleteStudent(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    fetchStudents();
}

// Initial Load
fetchStudents();