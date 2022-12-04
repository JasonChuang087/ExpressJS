const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

// 設定靜態資源 or middleware 
app.use(express.static('./static'))

app.get('/',(req,res)=>{
    console.log('hit')
    res.sendFile(path.resolve(__dirname,'./index.html'))
})

app.get('/hello',(req,res)=>{
    res.status(200).send('Hello world')
})

app.get('/user/',(req,res)=>{
    res.status(200).send('Hello world')
})

app.get('/user/:id', async function(req, res) { 
  console.log('ID:', req.params.id);
})

app.all('*',(req,res)=>{
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})

module.exports = app