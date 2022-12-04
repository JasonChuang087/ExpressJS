const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5000

// 設定靜態資源 or middleware 
app.use(express.static('./static'))
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "test"
  });
  
con.connect(function(err) {
    console.log('connect');
    if (err) throw err;
});

app.get('/user/:id', async function(req, res) { 
    console.log('ID:', req.params.id);
    const uid = req.params.id;
    con.query("SELECT * FROM users WHERE id=?",uid, function(err,rows){
        if(err){
            console.log(err);
        }
        const data = rows;
        console.log(data);
    } )

})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.all('*',(req,res)=>{
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})