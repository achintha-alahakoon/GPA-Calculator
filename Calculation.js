
document.getElementById('add').addEventListener('click', addCourse);
document.getElementById('calculate').addEventListener('click', calculateGpa);
document.getElementById('clear').addEventListener('click', clearTable);

// Define the grade point values
const gradePoints = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'E': 0.0
};

function addCourse() {
    const courseName = document.getElementById('courseName').value.trim();
    const courseCredit = parseFloat(document.getElementById('courseCredit').value.trim());
    const courseGrade = document.getElementById('courseGrade').value.trim().toUpperCase();

    // Validate input
    if (courseName === '' || isNaN(courseCredit) || !gradePoints.hasOwnProperty(courseGrade)) {
        alert('Please enter valid course details.');
        return;
    }

    const tableBody = document.getElementById('courseTableBody');
    const rowCount = tableBody.rows.length;
    
    // Create a new row and add it to the table
    const newRow = tableBody.insertRow(rowCount);
    newRow.insertCell(0).innerText = rowCount + 1;
    newRow.insertCell(1).innerText = courseName;
    newRow.insertCell(2).innerText = courseCredit;
    newRow.insertCell(3).innerText = courseGrade;

    // Clear input fields
    document.getElementById('courseName').value = '';
    document.getElementById('courseCredit').value = '';
    document.getElementById('courseGrade').value = '';
}

function calculateGpa() {
    const tableBody = document.getElementById('courseTableBody');
    let totalPoints = 0;
    let totalCredits = 0;

    // Iterate through each row to calculate the total points and credits
    for (let i = 0; i < tableBody.rows.length; i++) {
        const row = tableBody.rows[i];
        const credit = parseFloat(row.cells[2].innerText);
        const grade = row.cells[3].innerText;
        const gradePoint = gradePoints[grade];

        if (!isNaN(credit) && gradePoint !== undefined) {
            totalPoints += gradePoint * credit;
            totalCredits += credit;
        }
    }

    // Calculate GPA
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0.00;
    document.getElementById('gpaValue').innerText = gpa;
}

function clearTable() {
    const tableBody = document.getElementById('courseTableBody');
    tableBody.innerHTML = '';
    document.getElementById('gpaValue').innerText = '0.00';
}
