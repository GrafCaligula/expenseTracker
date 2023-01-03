/**
 * Express Server Setup
 * @component ExpressServer
 * @namespace ExpressServer
 * @name ExpressServer
 */
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'markus',
  password: '1323',
  database: 'expensetrackerdb',
});

app.post('/create', (req, res) => {
  const title = req.body.title;
  const amount = req.body.amount;
  const date = req.body.date;

  db.query(
    'INSERT INTO expenses (title, amount, date) VALUES (?,?,?)',
    [title, amount, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Expense inserted to DB');
      }
    }
  );
});
  
app.get('/fetch', (req, res) => {
  db.query('SELECT * FROM expenses',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

// app.put('update',(req, res) => {});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM expenses WHERE id = ?', [id], (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.send("Expense deleted from database.");
    }
  })
});


const port = 3001;
const message = () => {
  console.log('Server is running on port 3001');
};

app.listen(port, message); // to start the server: in folder write: "node index.js"

