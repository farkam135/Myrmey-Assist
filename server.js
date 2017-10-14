const UCI = require('UCI');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

function getStudentData(auth, res) {
    console.log(`Pulling information for: ${auth}`);
    return Promise.all([UCI.STUDENT.getDegreeWorks(auth), UCI.STUDENT.getCompletedCourses(auth)])
        .then((studentData) => {
            console.log(`INFORMATION PULLED`);
            res.send({
                success: true,
                data: {
                    degreeWorks: studentData[0],
                    completedCourses: studentData[1]
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