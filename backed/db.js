const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySql@2026!Tirana',
    database: 'menaxhim_pronash'
});

db.connect((err) => {
    if(err){
        console.log('Gabim ne lidhjen me databazen');
    } else {
        console.log('MySQL u lidh me sukses');
    }
});

module.exports = db;