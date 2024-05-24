const express = require("express")

const mysql = require("mysql2")
const bodyParser = require('body-parser');

const cors = require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(express.json());

const uri = `mysql://root:RDLUEzXbmEaUQTTdQSuhYIATXzmpelUH@viaduct.proxy.rlwy.net:51200/railway`;
const db = mysql.createConnection({uri});

app.get('/',(req,res)=>{
    return res.json("Welcome to backend")
})

app.post('/data', (req, res) => {
    const receivedData = req.body.data;
    console.log('Data received:', receivedData);
    

    // db.query(sq,[receivedData],(err, result) => {
    //     if (err) {
    //         console.error('Error executing query:', err.stack);
    //         res.status(500).send('Error inserting data into the database.');
    //         return;
    //     }
    //     console.log('Data inserted successfully:', result);
    //     res.send('Data received and inserted successfully!');
    // });
    const sq = `INSERT INTO todo.Events (event) VALUES (?)`;
db.query(sq,[receivedData], (err, result) => {
    if (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).send('Error inserting data into the database.');
        return;
    }
    console.log('Data inserted successfully:', result);
    res.send('Test data inserted successfully!');
});
});

app.get('/datas',(req,res)=>{
    const sql = "Select * from todo.Events";
    db.query(sql,(err,data)=>{
        if(err){
            return res.json(err);
        }
        return res.json(data);
    })
    console.log("Data sent succesfully");
})

app.listen(8081,()=>{
    console.log("Server running!")
})