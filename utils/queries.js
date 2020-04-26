const {Pool } = require('pg')


exports.getUserByEmail = (email) => {
    return query = {
        text: 'SELECT * FROM students WHERE email = $1',
        values:[email]
    };
}


exports.signUp =(email, password) => {
    return query = {
        text: 'INSERT INTO students VALUES ($1)',
        values:[email, password]
    };
}

exports.getStudentMessDetails = (student_id) => {
    return query = {
        text: 'SELECT * FROM mess_data WHERE student_id = $1',
        values:[student_id]
    }
}
