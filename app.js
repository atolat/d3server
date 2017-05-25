var PORT = process.env.PORT || 3000;
const express = require('express');
const router = express.Router();
const pg = require('pg');
var app = express();

//const conString = 'postgres://pdolcdhpesaiuw:a5c1df771d3b0b2b7554e4cf06621980cd0d1a647bd155fb6ae3848ce2856120@ec2-174-129-224-33.compute-1.amazonaws.com:5432/d6qes2ci89d25b'


allowCrossDomain = function(req, res, next) {
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

var client = new pg.Client({
    user: "pdolcdhpesaiuw",
    password: "a5c1df771d3b0b2b7554e4cf06621980cd0d1a647bd155fb6ae3848ce2856120",
    database: "d6qes2ci89d25b",
    port: 5432,
    host: "ec2-174-129-224-33.compute-1.amazonaws.com",
    ssl: true
});



app.get('/getdata', function(req, res) {
	client.connect();
    var query = client.query("SELECT * FROM public.LNA_ODS_FEEDBACK_ACTION;");
    query.on("row", function(row, result) {
        result.addRow(row);
    });
    query.on("end", function(result) {
        res.send(JSON.stringify(result.rows, null, "    "));
        client.end();
    });
    client.end();
});

//Connect to Express
app.listen(PORT, function() {
    console.log('Express listening on port:: ' + PORT);

});
