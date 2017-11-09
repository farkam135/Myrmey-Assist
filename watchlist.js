const nodemailer = require('nodemailer');

let transporter = null;
let MYRMEYDB = null;
let SOC = null;
let intervalHandle = null;


function init(soc, db, auth, interval) {
    let poolConfig = {
        pool: true,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth
    }

    let defaults = {
        from: '"MyrmeyAssist" <noreply@myrmeyassist.com>'
    }

    SOC = soc;
    MYRMEYDB = db;
    transporter = nodemailer.createTransport(poolConfig, defaults);
    intervalHandle = setInterval(checkWatchlist, 1000 * interval);
}

function stop(){
    if(!intervalHandle){
        return;
    }

    clearInterval(intervalHandle);
    intervalHandle = null;
}

function checkWatchlist(){
    let watchedCourses = undefined;

    MYRMEYDB.getWatchedCourses()
    .then((courses) => {
        //If nothing is on our watchlist don't bother making a request to uci
        if(courses.length === 0){ return Promise.resolve([]); }

        watchedCourses = courses; 
        return SOC.searchSchedule({
            CourseCodes: Object.keys(courses).join(',')
        })
    })
    .then((searchResults) => {
        searchResults.forEach((course) => {
            course.offerings.forEach((offering) => {
                console.log(`Checking Code: ${offering.Code}`);
                if(offering.Status !== "FULL"){
                    notifyCourseOpen(watchedCourses[offering.Code],offering.Code);
                    MYRMEYDB.deleteWatch(offering.Code);
                }
            })
        })
    })
}

function notifyCourseOpen(emails, code) {
    console.log(`Watchlist triggered for code:${code}`);
    transporter.sendMail({
        bcc: emails,
        subject: 'Course Status Change',
        html: `The following course code on your watchlist is no longer full: <b>${code}</b>! This course code has been removed from your watchlist.`
    })
}

module.exports.init = init;
module.exports.stop = stop;