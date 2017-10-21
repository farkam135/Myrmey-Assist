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

/**
 * generateMyrmeyId
 * 
 * Generates a MyrmeyId given the student's id number, name and any additional data that should be a part of the jwt. The generated
 * MyrmeyId is a jwt that can be used to authenticate student with MyrmeyAssist specific resources, such as the MyrmeyMessenger.
 * @param {string} idNumber The student's id number as pulled from UCI
 * @param {string} name The student's full name as pulled from UCI
 * @param {object} data Any additional data that might be required by other Myrmey resources
 * @return {string} The MyrmeyId jwt
 */
function generateMyrmeyId(idNumber, name, data){
    let hashedId = crypto.createHash('sha256').update(`${idNumber}${name}${config.salt}`).digest('hex');
    let signObject = Object.assign({
        id: hashedId
    }, data);

    return jwt.sign(signObject, config.salt);
}

function getStudentData(auth, res) {
    console.log(`Pulling information for: ${auth}`);
    return Promise.all([UCI.STUDENT.getDegreeWorks(auth), UCI.STUDENT.getCourses(auth)])
        .then((studentData) => {
            console.log(`INFORMATION PULLED`);
            let myrmeyid = generateMyrmeyId(studentData[0].student.id, studentData[0].student.name, {
                courses: Object.keys(studentData[1].inProgress)
            });

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