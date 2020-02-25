const mysql = require('mysql');

const sqlConnection = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'myPass',
  connectionLimit: 20,
  database: 'notetaker'
});

let notes_db = {};

notes_db.all = () => {
  return new Promise((resolve, reject) => {
    sqlConnection.query(`SELECT * FROM notes`, (err, data) => {
      if(err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

notes_db.create = (title, content) => {
  return new Promise((resolve, reject) => {
    sqlConnection.query(`INSERT INTO notes (title, content) VALUES("${title}", "${content}")`, (err, data) => {
        if(err) {
          return reject(err);
        }
        console.log(data);
        // return resolve(data);
      });
  });
};

module.exports = notes_db;