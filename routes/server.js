    const pg = require('pg')  
const conString = 'postgres://pdolcdhpesaiuw:a5c1df771d3b0b2b7554e4cf06621980cd0d1a647bd155fb6ae3848ce2856120@ec2-174-129-224-33.compute-1.amazonaws.com:5432/d6qes2ci89d25b' // make sure to match your own database's credentials


var client = new pg.Client({
    user: "pdolcdhpesaiuw",
    password: "a5c1df771d3b0b2b7554e4cf06621980cd0d1a647bd155fb6ae3848ce2856120",
    database: "d6qes2ci89d25b",
    port: 5432,
    host: "ec2-174-129-224-33.compute-1.amazonaws.com",
    ssl: true
}); 
client.connect();

var query = client.query("SELECT * FROM public.LNA_ODS_FEEDBACK_ACTION");
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});
