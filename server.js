const UCI = require('UCI');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/login', (req, res) => {
    console.log(`[LOGIN REQUEST] ${req.body.ucinetid}`);
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
                })
                .catch((err) => {
                    console.err(err);
                })
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