import express from "express";

const app = express();
const PORT = 3000;

app.get("/home", (req, res) => {
  res.send("<h1 style='color: green;'>Welcome Home</h1>");
});


app.get('/about', (req, res) => {
  res.type('text/plain').send(
    'About Us\n\n' +
    'This is a simple Express application.\n' +
    'We provide information about students and more.\n' +
    'Feel free to explore the routes!'
  );
});


app.get('/students/:studentId', (req, res) => {
  const { studentId } = req.params;
  const department = req.query.department || 'General';

  const student = {
    studentId,
    name: `Student Name ${studentId}`,
    department,
    enrollmentYear: 2025,
    details: `This is the student with ID ${studentId} from the ${department} department.`
  };

  res.json(student);


  
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


