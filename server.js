const UCI = require('UCI');
const app = require('express')();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const config = require('./config.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

function getStudentData(auth, res) {
    console.log(`Pulling information for: ${auth}`);
    return Promise.all([UCI.STUDENT.getDegreeWorks(auth), UCI.STUDENT.getCourses(auth)])
        .then((studentData) => {
            console.log(`INFORMATION PULLED`);
            let id = crypto.createHash('sha256').update(`${studentData[0].student.id}${studentData[0].student.name}${config.salt}`).digest('hex');
            let myrmeyid = jwt.sign({
                id,
                courses: `${Object.keys(studentData[1].inProgress)}`
            }, config.salt);

            res.send({
                success: true,
                data: {
                    myrmeyid: myrmeyid,
                    studentInfo: studentData[0].student,
                    advice: studentData[0].advice,
                    courses: studentData[1]
                }
            });
        })
        .catch((err) => {
            console.error(err);
        })
}

app.post('/api/login', (req, res) => {
    console.log(`[LOGIN REQUEST]`);
    if (req.body.ucinetid_auth) {
        auth = `ucinetid_auth=${req.body.ucinetid_auth}`
        getStudentData(auth, res);
        return;
    }

    UCI.STUDENT.login(req.body.ucinetid, req.body.password)
        .then((auth) => {
            getStudentData(auth, res);
        })
        .catch((error) => {
            console.error(error);
            res.send({
                success: false,
                error
            })
        })
});

app.listen(8080);