const express=require('express')
const app=express()
const axios=require("axios")
PORT=3030;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/stocks",(req,res)=>{
    console.log(req.query.link+"&query="+req.query.query)
    axios.get(req.query.link+"&query="+req.query.query).then(
        (resu)=>{
            console.log("dont panic")
            res.send(resu.data);
        }).catch((err)=>{console.log(err)})
})

app.listen(PORT,(err)=>{
    console.log("server started on"+PORT)
})
