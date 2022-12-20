const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');

const XLSX = require('xlsx');

const workbook = XLSX.readFile("students.xlsx");
const worksheet = workbook.Sheets["students"];

const students = XLSX.utils.sheet_to_json(worksheet);

app.use(cors({
  origin: 'https://mohamadalasaed.github.io'
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/addstudent', (req, res) => {
    console.log(req.body);
    XLSX.utils.sheet_add_aoa(worksheet, [[req.body.name, req.body.age, req.body.email]], { origin: -1 });
    XLSX.writeFile(workbook, "students.xlsx");
    students.push({ name: req.body.name, age: req.body.age, email: req.body.email });
    res.send(students)
  })

app.get('/students', function (req, res) {
  res.send(students)
})

app.listen(3000)