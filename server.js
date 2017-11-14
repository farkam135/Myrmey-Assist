const UCI = require('UCI');
const MYRMEYDB = require('./myrmeydb.js');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config.json');

let serverInitiated = false;

const services = {}
if (config.watchlist.enable) {
    services.watchlist = require('./watchlist.js');
    services.watchlist.init(UCI.SOC, MYRMEYDB, config.watchlist.gmail_auth, config.watchlist.interval);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'web/build')));

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

    let searchScheduleParams = {
        Dept: courseDeptNum[1],
        CourseNum: courseDeptNum[2]
    }

    Promise.all([UCI.SOC.getCourseDetails([courseName]), MYRMEYDB.getGrades(dbSelector), searchSchedule(searchScheduleParams)])
        .then((response) => {
            let course = response[0][courseName];
            if (!course) {
                res.send({
                    success: false, error: 'Invalid Course'
                });
                return;
            }
            course.dept = courseDeptNum[1];
            course.num = courseDeptNum[2];
            course.offerings = [];

            //If there are offerings add them, otherwise just leave it as an empty array.
            if (response[2].length > 0) {
                course.offerings = response[2][0].offerings;
            }

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
            res.send({ success: true, data: course });
        })
        .catch((err) => {
            console.error(err);
            res.send({ success: false, error: err });
        })
}

const offeringBlacklist = ["Nor", "Place", "Req", "Rstr", "Sec", "Textbooks", "Web"]; //The columns to remove before passing onto the frontend
function searchSchedule(search, res) {
    return UCI.SOC.searchSchedule(search)
        .then((results) => {
            //We have the results go through and modify the instructors to add their ratemyprofessor object and remove blacklisted columns
            results.forEach((course) => {
                course.offerings.forEach((offering) => {
                    offeringBlacklist.forEach((blacklistedColumn) => {
                        offering[blacklistedColumn] = undefined;
                    });

                    offering.Time = offering.Time.trim();
                    offering.Instructor = offering.Instructor.map((instructor) => {
                        let rmp = UCI.PROFS.getProfessor(instructor);
                        return {
                            name: instructor,
                            rmp
                        }
                    })
                })
            });

            if (res) {
                res.send({
                    success: true,
                    data: results
                });
                return Promise.resolve();
            }

            return results;
        });
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
        res.send({ success: false, error: 'ERROR: Please provide a course.' });
        return;
    }

    getCourseDetails(req.query.course, res);
});

app.post('/api/searchSchedule', (req, res) => {
    if (!serverInitiated) {
        res.send({
            success: false,
            error: 'MyrmeyAssist was just updated and is currently restarting. Please try again in 1-2 minutes.'
        })
        return;
    }

    console.log(`[searchSchedule REQUEST]`);
    if (req.body.InstrName === '' && req.body.CourseCodes === '' && req.body.Dept === 'ALL' && req.body.Breadth === 'ANY') {
        res.send({
            success: false,
            error: 'ERROR: You must specify an Instructor, Course Code range, Department, or Breadth category.'
        });
        return;
    }

    searchSchedule(req.body, res);
});

app.post('/api/addCompletedCourse', (req, res) => {
    console.log(`[addCompletedCourse REQUEST]`);
    if (!req.body.myrmeyid || !req.body.courseName) {
        res.send({
            success: false,
            error: 'ERROR: Invalid course name or id specified.'
        });
        return;
    }

    //Verify the student's myrmeyid before adding their completed course
    jwt.verify(req.body.myrmeyid, config.salt, (error, decoded) => {
        if (error) {
            res.send({
                success: false,
                error
            });
            return;
        }

        MYRMEYDB.addCompletedCourse(decoded.id, req.body.courseName)
            .then(() => {
                res.send({ success: true })
            })
    });
});

app.post('/api/addWatchlist', (req, res) => {
    console.log(`[addWatchlist REQUEST]`);
    if (!req.body.email || !req.body.code) {
        res.send({
            success: false,
            error: 'ERROR: Invalid email or code specified.'
        });
        return;
    }
    MYRMEYDB.addWatch(req.body.email, req.body.code)
        .then(() => {
            res.send({ success: true });
        })
        .catch((err) => {
            if (err.detail.includes('already exists')) {
                res.send({ success: false, error: `${req.body.code} is already on your watchlist.` });
            }
        });

    //Disabled while login is disabled
    /* if (!req.body.myrmeyid || !req.body.email || !req.body.code) {
        res.send({
            success: false,
            error: 'ERROR: Invalid email, code or id specified.'
        });
        return;
    } */

    //[Disabled while login is disabled] Verify the student's myrmeyid before adding their request to the watchlist
    /* jwt.verify(req.body.myrmeyid, config.salt, (error, decoded) => {
        if (error) {
            res.send({
                success: false,
                error
            });
            return;
        }

        MYRMEYDB.addWatch(req.body.email, req.body.code)
            .then(() => {
                res.send({ success: true });
            })
            .catch((err) => {
                if (err.detail.includes('already exists')) {
                    res.send({ success: false, error: `${req.body.code} is already on your watchlist.` });
                }
            });
    }); */
});

function approveDomains(opts, certs, cb) {
    // This is where you check your database and associated
    // email addresses with domains and agreements and such


    // The domains being approved for the first time are listed in opts.domains
    // Certs being renewed are listed in certs.altnames
    if (certs) {
        opts.domains = ['myrmeyassist.com', 'www.myrmeyassist.com'];
    }
    else {
        opts.email = 'kamron@myrmeyassist.com';
        opts.agreeTos = true;
    }

    // NOTE: you can also change other options such as `challengeType` and `challenge`
    // opts.challengeType = 'http-01';
    // opts.challenge = require('le-challenge-fs').create({});

    cb(null, { options: opts, certs: certs });
}

function startProdServer() {
    // returns an instance of node-greenlock with additional helper methods
    var lex = require('greenlock-express').create({
        // set to https://acme-v01.api.letsencrypt.org/directory in production
        server: 'https://acme-v01.api.letsencrypt.org/directory'

        // If you wish to replace the default plugins, you may do so here
        //
        , challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }
        , store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' })

        // You probably wouldn't need to replace the default sni handler
        // See https://git.daplie.com/Daplie/le-sni-auto if you think you do
        //, sni: require('le-sni-auto').create({})

        , approveDomains: approveDomains
    });

    // handles acme-challenge and redirects to https
    require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
        console.log("Listening for ACME http-01 challenges on", this.address());
    });

    // handles your app
    require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
        console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
    });
}

if (config.production) {
    startProdServer();
}
else {
    app.listen(8080);
}

UCI.SOC.init()
    .then(() => {
        //return Promise.resolve();
        return Promise.all([UCI.PROFS.refreshProfs(), UCI.SOC.loadDept("COMPSCI")]);
    })
    .then(() => {
        serverInitiated = true;
    })