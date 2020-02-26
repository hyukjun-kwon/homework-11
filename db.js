const mysql = require('mysql');

// db connection
console.log(process.env.JAWSDB_URL);
if(process.env.JAWSDB_URL) {
  const connection = mysql.createPool(process.env.JAWSDB_URL);
}
else {
  const connection = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'myPass',
    connectionLimit: 20,
    database: 'notetaker'
  });
}

let db = {};

db.all = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM notes`, (err, data) => {
      if(err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

db.create = (title, content) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO notes (title, content) VALUES ("${title}", "${content}");`, (err, data) => {
        if(err) {
          return reject(err);
        }
        return resolve(data.insertId);
      });
  });
};

db.delete = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM notes WHERE id = ${id};`, (err, data) => {
      if(err) {
        return reject(err);
      }
      return resolve(data);
    });
  })
};

db.update = (id, title, content) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE notes SET title = "${title}", content = "${content}" WHERE id = ${id};`, (err, data) => {
        if(err) {
          return reject(err);
        }
        return resolve(data);
      });
  });
}

db.find = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM notes WHERE id = ${id};`, (err, data) => {
      if(err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

module.exports = db;