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

function sendRequest(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("John");
            reject("500 error");
        },2000);
    });
}

let result = function( sql, uid ) {
    return new Promise(( resolve, reject ) => {
        con.connect(function(err) {
        if (err) {
          reject( err )
        } else {
            con.query(sql, uid, (err, rows) => {
            if ( err ) {
                reject( err )
            } else {
                resolve( rows )
            }
            con.release()
          })
        }
      })
    })
}


app.get('/user/:id', async function(req, res) { 
    console.log('ID:', req.params.id);
    const uid = req.params.id;
    const query = "SELECT * FROM users WHERE id=?";
    const data = await result(uid,query);
    console.log(data[0]);
    res.json({ user: data[0].name });
})

app.all('*',(req,res)=>{
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})