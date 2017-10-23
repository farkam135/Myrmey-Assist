const UCI = require('UCI');
const MYRMEYDB = require('./myrmeydb.js');
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
 * Generates a MyrmeyId given the student's hashed id and any additional data that should be a part of the jwt. The generated
 * MyrmeyId is a jwt that can be used to authenticate student with MyrmeyAssist specific resources, such as the MyrmeyMessenger.
 * @param {string} id The student's hashed id
 * @param {object} data Any additional data that might be required by other Myrmey resources
 * @return {string} The MyrmeyId jwt
 */
function generateMyrmeyId(id, data) {
    let signObject = Object.assign({
        id
    }, data);

    return jwt.sign(signObject, config.salt);
}

function getStudentData(auth, res) {
    console.log(`Pulling information for: ${auth}`);
    return Promise.all([UCI.STUDENT.getDegreeWorks(auth), UCI.STUDENT.getCourses(auth)])
        .then((studentData) => {
            let hashedId = crypto.createHash('sha256').update(`${studentData[0].student.id}${studentData[0].student.name}${config.salt}`).digest('hex');

            console.log(`Generating MyrmeyId`);
            let myrmeyid = generateMyrmeyId(hashedId, {
                courses: Object.keys(studentData[1].inProgress)
            });

            console.log(`Adding Grades to MyrmeyDB`);
            MYRMEYDB.addGrades(hashedId, studentData[1].completed);

            console.log(`Getting Manually Added Completed Courses`);
            MYRMEYDB.getCompletedCourses(hashedId)
                .then((manualCompletedCourses) => {
                    studentData[1].completed = Object.assign(studentData[1].completed, manualCompletedCourses);
                    res.send({
                        success: true,
                        data: {
                            myrmeyid: myrmeyid,
                            studentInfo: studentData[0].student,
                            advice: studentData[0].advice,
                            courses: studentData[1]
                        }
                    });
                });
        })
        .catch((err) => {
            console.error(err);
        })
}

function getCourseDetails(courseName, res) {
    let courseDeptNum = /^(.+)\s(.+)$/.exec(courseName);
    let dbSelector = {
        dept: courseDeptNum[1],
        num: courseDeptNum[2]
    }

    Promise.all([UCI.SOC.getCourseDetails([courseName]), MYRMEYDB.getGrades(dbSelector)])
        .then((response) => {
            let course = response[0][courseName];
            let courseGrades = {};

            //Go through the results of the db grade lookup for the course, organizing the grades by professor.
            response[1].forEach((row) => {
                if (courseGrades[row.instructor] === undefined) {
                    let ratemyprofessor = UCI.PROFS.getProfessor(row.instructor);
                    courseGrades[row.instructor] = {
                        instructor: {
                            name: row.instructor,
                            rmp: ratemyprofessor
                        },
                        A: 0,
                        B: 0,
                        C: 0,
                        D: 0,
                        F: 0,
                        P: 0,
                        NP: 0
                    };
                }

                courseGrades[row.instructor][row.grade[0]] += 1; //Use row.grade[0] to treat +/- the same. A+/- = A
            })

            course.gradeDistributions = [];
            Object.keys(courseGrades).forEach((instructor) => {
                course.gradeDistributions.push(courseGrades[instructor]);
            });
            res.send(course);
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

app.get('/api/getCourseDetails', (req, res) => {
    console.log(`[getCourseDetails REQUEST]`);
    if (!req.query.course) {
        res.send('ERROR: Please provide a course.');
        return;
    }

    getCourseDetails(req.query.course, res);
});

UCI.SOC.init()
    .then(() => {
        return Promise.all([UCI.SOC.loadAll('COMPSCI')]);
    })
    .then(() => {
        app.listen(8080, () => {
            console.log('Server Running...');
        });
    })