const mysql = require('mysql2');

var conn = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6634662",
    password: "7CSbq5IrGM",
    database: 'sql6634662'
  });

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!!!");
});

module.exports = conn;