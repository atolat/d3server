//new server
var express = require('express');
var app = express();
//var routes = require('./routes/server')(app);
var PORT = process.env.PORT || 3000;
//const express = require('express');


allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);


const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://pdolcdhpesaiuw:a5c1df771d3b0b2b7554e4cf06621980cd0d1a647bd155fb6ae3848ce2856120@ec2-174-129-224-33.compute-1.amazonaws.com:5432/d6qes2ci89d25b';
    
router.get('/getdata', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM public.LNA_ODS_CN_ACTION LIMIT 10;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


//Connect to Express
app.listen(PORT, function () {
    console.log('Express listening on port:: ' + PORT);

});