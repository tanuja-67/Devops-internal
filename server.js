const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());
let students = [
  {
    id: 1,
    name: 'Tanuja',
    course: 'CSE',
    rollNo: '23071A05A4',
  },
  {
    id: 2,
    name: 'Alice',
    course: 'CSDS',
    rollNo: '23071A3110',
  }
];

app.get('/students', (req, res) => {
  res.json({
    success: true,
    message: 'Students data loaded',
    data: students
  });
});

app.get('/students/:id', (req, res) => {
  const student = students.find((item) => item.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'data unavailable'
    });
  }
  res.json({
    success: true,
    message: 'Student data retrieved',
    data: student
  });
});

app.post('/students', (req, res) => {
  const {id, name, course , rollNo } = req.body;
  if (!name || !rollNo || !course) {
    return res.status(400).json({
      success: false,
      message: 'data invalid'
    });
  }
  let newStudent = {
    id,
    name,
    rollNo,
    course
  };
  students.push(newStudent);
  res.json({
    success: true,
    message: 'Student added successfully',
    data: newStudent
  });
});

app.patch('/students/:id', (req, res) => {
  const stud = students.find((item) => item.id === Number(req.params.id));
  if (!stud) {
    return res.status(404).json({
      success: false,
      message: 'data unavailable'
    });
  }
  const { n, c, r } = req.body;
  if (n !== undefined) stud.name = n;
  if (r !== undefined) stud.rollNo = r;
  if (c !== undefined) stud.course = c;
  res.json({
    success: true,
    message: 'data updated successfully',
    data: stud
  });
});

app.delete('/students/:id', (req, res) => {
  const stuidx = students.findIndex((item) => item.id === Number(req.params.id));
  if (stuidx === -1) {
    return res.status(404).json({
      success: false,
      message: 'data unavailable'
    });
  }
  const deletedStudent = students.splice(stuidx, 1)[0];
  res.json({
    success: true,
    message: 'data deleted successfully',
    data: deletedStudent
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});