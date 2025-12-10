
const http = require('http');
const url = require('url');

//=================== PART 1 ===================//
const server1 = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && req.url === '/') {
        res.end(JSON.stringify({ message: "Welcome to the Home Page" }));
    }
    else if (req.method === 'GET' && req.url === '/info') {
        res.end(JSON.stringify({ message: "This is the information page" }));
    }
    else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            res.end(body);   // returning same JSON
        });
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server1.listen(3000, () => console.log("Server 1 running on port 3000"));


//=================== PART 2 ===================//
let students = [];
let idCount = 1;

const server2 = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const parsedUrl = url.parse(req.url, true);

    // GET /students
    if (req.method === 'GET' && parsedUrl.pathname === '/students') {
        res.end(JSON.stringify(students));
    }

    // POST /students
    else if (req.method === 'POST' && parsedUrl.pathname === '/students') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const data = JSON.parse(body);
            const newStudent = { id: idCount++, name: data.name };
            students.push(newStudent);
            res.end(JSON.stringify(newStudent));
        });
    }

    // PUT /students/:id
    else if (req.method === 'PUT' && parsedUrl.pathname.startsWith('/students/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]);
        let body = '';

        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const data = JSON.parse(body);
            const student = students.find(s => s.id === id);

            if (!student) return res.end(JSON.stringify({ error: "Student not found" }));

            student.name = data.name;
            res.end(JSON.stringify(student));
        });
    }

    // DELETE /students/:id
    else if (req.method === 'DELETE' && parsedUrl.pathname.startsWith('/students/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]);
        const index = students.findIndex(s => s.id === id);

        if (index === -1) return res.end(JSON.stringify({ error: "Student not found" }));

        students.splice(index, 1);
        res.end(JSON.stringify({ message: "Student deleted successfully" }));
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server2.listen(4000, () => console.log("Server 2 running on port 4000"));
