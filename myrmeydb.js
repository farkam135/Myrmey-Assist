const config = require('./config.json');
const pg = require('pg').Pool;

const pool = new pg(config.db);

//Used to check connection before actual queries are run.
pool.query('SELECT NOW()')
  .catch((err) => {
    console.error(`ERROR CONNECTING TO DB: ${err}`);
    process.exit(1);
  });

/**
 * addGrades
 * 
 * Function used to add student grades to the db. Provided with a hashed id and completed 
 * courses object, this function goes through all completed courses and adds their 
 * dept, num, year_term, instructor and grade to the db.
 * 
 * @param {string} id The hashed id of the student (student id number + full name + salt)
 * @param {object} courses The courses.completed object that is pulled from the UCI-API. Do not pass courses that do not have a grade!
 */
function addGrades(id, courses) {
  pool.connect()
    .then((client) => {
      //Go through all the courses
      Object.keys(courses).forEach((course) => {
        let courseObject = courses[course];
        let values = [id, courseObject.YearTerm, courseObject.dept, courseObject.num, courseObject.instructor, courseObject.grade];
        client.query('INSERT INTO grades(id, year_term, dept, num, instructor, grade) VALUES ($1, $2, $3, $4, $5, $6)', values)
          .catch((e) => {
            //Grades already exist.
          });
      });
      client.release();
    })
}

/**
 * addCompletedCourse
 * 
 * Adds a completed course to a hashed id. Used for overwriting prereq requirements. Since transfer students/ap students
 * courses aren't pulled, if the student says they took a course they can add it here.
 * @param {string} id The hashed student id 
 * @param {string} courseName The course name they completed (i.e. 'COMPSCI 161')
 * @return {promise} A promise that resolves if success.
 */
function addCompletedCourse(id, courseName) {
  return pool.query('INSERT INTO completed_courses(id, course) VALUES ($1, $2)', [id, courseName]);
}

/**
 * getCompletedCourses
 * 
 * Gets the completed courses of a hashed id.
 * @param {string} id The hashed id to get the completed courses for
 * @return {promise} A promise that resolved to a completed courses object on success. This the keys will be course names and the value will just be 'Manual'
 */
function getCompletedCourses(id) {
  return pool.query('SELECT course FROM completed_courses WHERE id=$1', [id])
    .then((res) => {
      let completedCourses = {};

      //Go through all the courses to add them to the return object with key being the name and value being 'Manual' 
      res.rows.forEach((c) => {
        completedCourses[c.course] = 'Manual';
      });
      return completedCourses;
    });
}

/**
 * getGrades
 * 
 * Queries the grades table in the db returning a promise that resolves to the results based off the selectors in the
 * search object parameter.
 * @param {object} search The searh selectors, valid keys: id, year_term, dept, num, instructor, grade
 * @return {promise} A promise that resolves to an array of objects with keys: id, year_term, dept, num, instructor, grade
 */
function getGrades(search) {
  let query = 'SELECT id, year_term, dept, num, instructor, grade FROM grades';
  let selectorValues = [];

  if (search !== undefined) {
    //We have a search object so add a WHERE clause, loop through the search object and add the selectors to the query
    query += ' WHERE';
    Object.keys(search).forEach((col, i) => {
      query += ` ${col}=$${i + 1}`; //We add the values to the selectorValues so for the query set the value to $index
      selectorValues.push(search[col]);
    });
  }

  return pool.query(query, selectorValues)
    .then((res) => {
      return res.rows;
    })
}

module.exports.addGrades = addGrades;
module.exports.getGrades = getGrades;
module.exports.addCompletedCourse = addCompletedCourse;
module.exports.getCompletedCourses = getCompletedCourses;