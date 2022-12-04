const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

// 設定靜態資源 or middleware 
app.use(express.static('./static'))
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "test"
});
  
app.get('/user/:id', function(req, res) { 
    console.log('ID:', req.params.id);
    const uid = req.params.id;
    con.connect(function(err) {
        console.log('connect');
        if (err) throw err;
        else{
            con.query("SELECT * FROM users WHERE id=?",uid, function(err,rows){
                if(err){
                    console.log(err);
                }
                const data = rows;
                console.log(data);
            } )
        }
    });
})

app.all('*',(req,res)=>{
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})