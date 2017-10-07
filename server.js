const UCI = require('UCI');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/login', (req, res) => {
    console.log(`[LOGIN REQUEST] ${req.body.ucinetid} | ${req.body.password}`);
    UCI.STUDENT.login(req.body.ucinetid, req.body.password)
        .then((auth) => {
            console.log(`[LOGIN SUCCESS] Pulling information for: ${req.body.ucinetid}`);
            Promise.all([UCI.STUDENT.getDegreeWorks(auth), UCI.STUDENT.getCompletedCourses(auth)])
                .then((studentData) => {
                    console.log(`[INFORMATION PULLED]`);
                    res.send({
                        success: true,
                        data: {
                            degreeWorks: studentData[0],
                            completedCourses: studentData[1]
                        }
                    });
                });
        })
        .catch((error) => {
            res.send({
                success: false,
                error
            })
        })
});

app.listen(8080);