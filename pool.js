const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
// 設定靜態資源 or middleware 
app.use(express.static('./static'))
const mysql = require('mysql');

const pool  = mysql.createPool({
    host: "localhost",
    user: "user",
    password: "password",
    database: "test"
});

let result = function( uid ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) 
            {
                // 取得可用連線出錯
                reject( err )
            }
            else
            {
                // 成功取得可用連線
                // 使用取得的連線
                connection.query( "SELECT * FROM users WHERE id=?",uid, (err, rows) => {
                    // 使用連線查詢完資料
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    // 釋放連線
                    connection.release();
                    // 不要再使用釋放過後的連線了，這個連線會被放到連線池中，供下一個使用者使用
                });
            }
        });
    })
}

app.get('/user/:id', async function(req, res) { 
    console.log('ID:', req.params.id);
    const uid = req.params.id;
    const data = await result(uid);
    console.log(data[0]);
    res.json({ user: data[0].name });

})

app.all('*',(req,res)=>{
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})