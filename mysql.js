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

let result = function( uid,err ) {
    return new Promise(( resolve, reject ) => {
        // con.connect(function(err) {
        if (err) {
          reject( err )
        } else {
            con.query("SELECT * FROM users WHERE id=?", uid, (err, rows) => {
            if ( err ) {
                reject( err )
            } else {
                resolve( rows )
            }
          })
        }
    //   })
    })
}


app.get('/user/:id', function(req, res) { 
    console.log('ID:', req.params.id);
    const uid = req.params.id;
    con.connect(async function(err) {
        const data = await result(uid,err);
        console.log(data[0]);
        res.json({ user: data[0].name });
    });
})

app.all('*',(req,res)=>{
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})